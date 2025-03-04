import { dir } from "i18next";
import { i18n } from "../next-i18next.config";

export function getOptions(locale = i18n.defaultLocale) {
  return {
    supportedLngs: i18n.locales,
    fallbackLng: i18n.defaultLocale,
    lng: locale,
  };
}
