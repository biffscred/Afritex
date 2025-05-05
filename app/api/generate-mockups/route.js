// app/api/generate-mockups/route.js
import { NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'

const sleep = ms => new Promise(r => setTimeout(r, ms))

export async function GET() {
  const token   = process.env.REPLICATE_API_TOKEN
  const baseUrl = process.env.NGROK_BASE_URL
  if (!token || !baseUrl) {
    return NextResponse.json({ message: 'Token ou Ngrok manquant' }, { status: 401 })
  }

  // 1) Récup products sans mockup puis filter ceux avec image
  const raws     = await prisma.product.findMany({ where: { mockupImage: null } })
  const products = raws.filter(p => p.image != null)

  for (const prod of products) {
    // build prompt...
    const prompt = `Apply this African textile pattern ... using image ${baseUrl}/${prod.image}`

    // 2) Lancement de la prédiction
    const postResp = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({
        version: '<VOTRE_VERSION_ID_VALIDE>',
        input:   { prompt },
      }),
    })
    const postBody = await postResp.json()
    if (postResp.status === 422) {
      console.error(`❌ Version invalide pour "${prod.name}"`) 
      continue
    }

    const predId = postBody.id
    if (!predId) {
      console.warn(`⚠️ Pas d’ID de prédiction pour ${prod.name}`, postBody)
      continue
    }

    // 3) Polling jusqu'à réussite ou échec
    let status, getBody
    do {
      await sleep(1000)  // une seconde
      const getResp = await fetch(`https://api.replicate.com/v1/predictions/${predId}`, {
        headers: { Authorization: `Token ${token}` }
      })
      getBody = await getResp.json()
      status  = getBody.status
      if (status === 'failed') {
        console.warn(`❌ Génération échouée pour ${prod.name}`, getBody)
        break
      }
    } while (status !== 'succeeded')

    if (status !== 'succeeded' || !Array.isArray(getBody.output)) {
      continue
    }

    const imageUrl = getBody.output.at(-1)
    // 4) Mise à jour Prisma
    await prisma.product.update({
      where: { id: prod.id },
      data:  { mockupImage: imageUrl },
    })
    console.log(`✅ Mockup enregistré pour ${prod.name}`)
    
    // 5) Petite pause pour éviter le rate-limit
    await sleep(500)
  }

  return NextResponse.json({ message: '✨ Traitement terminé, regarde les logs.' })
}
