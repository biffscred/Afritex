// import React from "react";

// import Navbar from "../../Layouts/CommonLayouts/Navbar4";
// import Footer from "../../Layouts/CommonLayouts/Footer2";
// import { Col, Container, Form, Input, Row } from "reactstrap";



// const LoadingContainer = () => <div>Loading...</div>;
// const Contact1 = (props) => {
//   //meta title
//   document.title = "Themebau | Contact 1";
//   return (
//     <React.Fragment>
//       <Navbar navClass="navbar-fixed" styleClass="2" />
//       <div className="content-wrap" id="content-wrap">
//         <div className="py-160">
//           <Container>
//             <Row className="mb-n8">
//               <Col lg={10} xl={8} className="col-12" data-aos="fade-up">
//                 <h1 className="h2 mt-15 pb-4 pb-sm-0 mb-130">
//                   For any enquiries, or to say hello, get in touch 👋
//                 </h1>
//               </Col>
//             </Row>
//             <Row className="gh-1 gv-2 pb-10">
//               <Col lg={4} className="col-12">
//                 <div className="mb-60" data-aos="fade-right">
//                   <p className="lead mb-17 fw-medium">Contact info:</p>
//                   <ul className="list-group borderless font-size-17">
//                     <li className="list-group-item">
//                       Email:{" "}
//                       <a
//                         href="mailto:hello@themebau.com?subject=Test%20Address%20Email"
//                         className="text-decoration-none"
//                       >
//                         hello@themebau.com
//                       </a>
//                     </li>
//                     <li className="list-group-item">
//                       Phone:{" "}
//                       <a
//                         href="callto:+1 202-358-0309"
//                         className="text-decoration-none"
//                       >
//                         +1 202-358-0309
//                       </a>
//                     </li>
//                   </ul>
//                 </div>
//                 <div className="mb-60 mt-n15" data-aos="fade-right">
//                   <p className="lead mb-17 fw-medium">Address:</p>
//                   <ul className="list-group borderless font-size-17">
//                     <li className="list-group-item">
//                       1551 Hotwater onoff st.,
//                     </li>
//                     <li className="list-group-item">Kyiv city, UA 02000</li>
//                   </ul>
//                 </div>
//                 <div className="mt-n15" data-aos="fade-right">
//                   <p className="lead mb-17 fw-medium">Hours of Operation:</p>
//                   <ul className="list-group borderless font-size-17">
//                     <li className="list-group-item">Monday - Friday</li>
//                     <li className="list-group-item">10:00 am - 7:30 pm</li>
//                   </ul>
//                 </div>
//               </Col>
//               <Col lg={8} className="col-12 mt-5 mt-lg-0">
//                 <Form action="#">
//                   <Row className="gh-1 gv-2">
//                     <Col md={6} className="col-12" data-aos="fade-up">
//                       <Input
//                         type="name"
//                         className="form-control"
//                         placeholder="Your Name *"
//                       />
//                     </Col>
//                     <Col md={6} className="col-12" data-aos="fade-up">
//                       <Input
//                         type="email"
//                         className="form-control"
//                         placeholder="Your Email *"
//                       />
//                     </Col>
//                     <Col md={6} className="col-12" data-aos="fade-up">
//                       <Input
//                         type="phone"
//                         className="form-control"
//                         placeholder="Your Phone *"
//                       />
//                     </Col>
//                     <Col md={6} className="col-12" data-aos="fade-up">
//                       <Input
//                         type="company"
//                         className="form-control"
//                         placeholder="Company"
//                       />
//                     </Col>
//                     <Col md={6} className="col-12" data-aos="fade-up">
//                       <select className="form-control">
//                         <option defaultValue>Type of Project</option>
//                         <option>Colibri Creative Project</option>
//                         <option>Colibri Project</option>
//                         <option>Happy Moments Photoset</option>
//                         <option>Luxury Car Website</option>
//                         <option>Funny Dog</option>
//                         <option>Creative Branding</option>
//                       </select>
//                     </Col>
//                     <Col md={6} className="col-12" data-aos="fade-up">
//                       <select className="form-control">
//                         <option defaultValue>Your Budget</option>
//                         <option>&lt; 10 000</option>
//                         <option>10-20k</option>
//                         <option>20-30k</option>
//                         <option>&gt; 30 000</option>
//                       </select>
//                     </Col>
//                     <Col className="col-12" data-aos="fade-up">
//                       <Input
//                         type="text"
//                         className="form-control"
//                         placeholder="Title"
//                       />
//                     </Col>
//                     <Col className="col-12" data-aos="fade-up">
//                       <textarea
//                         className="form-control"
//                         rows="1"
//                         placeholder="Message *"
//                       ></textarea>
//                     </Col>
//                     <Col className="col-12" data-aos="fade-up">
//                       <button
//                         className="btn btn-dark btn-with-ball mt-20"
//                         type="button"
//                         name="button"
//                       >
//                         submit
//                         <span className="btn-ball" style={{ transform: "translateY(0px)" }}></span>
//                       </button>
//                     </Col>
//                   </Row>
//                 </Form>
//               </Col>
//             </Row>
//             <div
//               id="map"
//               className="gmaps mt-130"
//               style={{ position: "relative" }}
//             >
//               {/* <Map
//                 google={props.google}
//                 zoom={8}
//                 style={mapStyles}
//                 initialCenter={{ lat: 34.134117, lng: -118.321495 }}
//               >
//                 <Marker position={{ lat: 48.0, lng: -122.0 }} />
//                 <Marker position={{ lat: 34.134117, lng: -118.321495 }} />
//                 <Marker position={{ lat: 32.995049, lng: -111.536324 }} />
//                 <Marker position={{ lat: 37.383064, lng: -109.071236 }} />
//                 <Marker position={{ lat: 39.877586, lng: -79.640617 }} />
//               </Map> */}
//             </div>
//           </Container>
//         </div>
//       </div>
//       <Footer />
//     </React.Fragment>
//   );
// };

// export default ({
//   apiKey: "AIzaSyAbvyBxmMbFhrzP9Z8moyYr6dCr-pzjhBE",
//   LoadingContainer: LoadingContainer,
  
// })(Contact1);
