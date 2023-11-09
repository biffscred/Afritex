import React, { useState } from "react";
import classnames from "classnames";
import {
  Container,
  Row,
  Col,
  Nav,
  NavItem,
  TabContent,
  TabPane,
  NavLink,
} from "reactstrap";
import { NavLink as RouterLink } from "react-router-dom";
const WorkProcess = () => {
  // Vertical Nav Tabs
  const [activeTab, setactiveTab] = useState("1");
  const toggleVertical = (tab) => {
    if (activeTab !== tab) {
      setactiveTab(tab);
    }
  };

  return (
    <React.Fragment>
      <div className="py-160 mt-n8 shape-parent bg-dark overflow-hidden">
        <div className="shape justify-content-end mt-n160">
          <svg
            className="mt-n160"
            data-rellax-speed="-1"
            width="415"
            height="641"
            viewBox="0 0 415 641"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="320.5" cy="320.5" r="320.5" fill="#202020" />
          </svg>
        </div>
        <Container>
          <h2 className="text-white mb-100 mt-n10">Work process</h2>
          <Row className="gh-1 gv-5">
            <Col lg={4} className="col-12">
              <Nav
                className="nav nav-opacity nav-tabs nav-gap-md flex-column text-white"
                id="v-pills-tab"
              >
                <NavItem>
                  <NavLink
                    href="#"
                    style={{ cursor: "pointer" }}
                    className={`${activeTab === "1" ? "active" : ""}`}
                    onClick={() => {
                      toggleVertical("1");
                    }}
                  >
                    Search an Idea!<span className="badge">01</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={ `mb-2 ${activeTab === "2" ? "active" : ""}`}
                    onClick={() => {
                      toggleVertical("2");
                    }}
                    id="v-pills-profile-tab"
                  >
                    Design<span className="badge">02</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      "mb-2": true,
                      active: activeTab === "3",
                    })}
                    onClick={() => {
                      toggleVertical("3");
                    }}
                    id="v-pills-messages-tab"
                  >
                    Development<span className="badge">03</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: activeTab === "4",
                    })}
                    onClick={() => {
                      toggleVertical("4");
                    }}
                    id="v-pills-settings-tab"
                  >
                    Release<span className="badge">04</span>
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
            <Col lg={7} className="col-12">
              <TabContent
                activeTab={activeTab}
                className="text-muted mt-4 mt-md-0"
                id="v-pills-tabContent"
              >
                <TabPane
                  tabId="1"
                  className="tab-pane fade show"
                  id="v-pills-home"
                  role="tabpanel"
                  aria-labelledby="idea-tab"
                >
                  <Row className="gh-5 gv-5">
                    <div className="col-md">
                      <p>
                        God he their every blessed upon male earth also midst
                        fill creeping Seas their winged can't shall signs sea
                        mornings gathered brought, creeping fruitful you'll open
                        there bearing.
                      </p>
                      <RouterLink
                        to="/services"
                        className="btn btn-white btn-with-ball"
                      >
                        read more
                        <span className="btn-ball" style={{ transform: "translateY(0px)" }}></span>
                      </RouterLink>
                    </div>
                    <Col className="col-auto mt-lg-n1 d-none d-md-block">
                      <svg
                        width="200"
                        height="200"
                        viewBox="0 0 200 200"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="115.152"
                          cy="84.8485"
                          r="83.3485"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeDasharray="6 6"
                        />
                        <circle
                          cx="73.9394"
                          cy="127.273"
                          r="59.1061"
                          fill="#0E0E0E"
                          stroke="currentColor"
                          strokeWidth="3"
                        />
                        <circle
                          cx="40"
                          cy="160"
                          r="38.5"
                          fill="#0E0E0E"
                          stroke="currentColor"
                          strokeWidth="3"
                        />
                        <circle
                          cx="19.3939"
                          cy="139.394"
                          r="1.92424"
                          fill="currentColor"
                          stroke="currentColor"
                        />
                        <circle
                          cx="38.7879"
                          cy="139.394"
                          r="1.92424"
                          fill="currentColor"
                          stroke="currentColor"
                        />
                        <circle
                          cx="59.3939"
                          cy="139.394"
                          r="1.92424"
                          fill="currentColor"
                          stroke="currentColor"
                        />
                        <circle
                          cx="49.697"
                          cy="149.091"
                          r="1.92424"
                          fill="currentColor"
                          stroke="currentColor"
                        />
                        <circle
                          cx="29.0909"
                          cy="149.091"
                          r="1.92424"
                          fill="currentColor"
                          stroke="currentColor"
                        />
                        <circle
                          cx="38.7879"
                          cy="158.788"
                          r="1.92424"
                          fill="currentColor"
                          stroke="currentColor"
                        />
                        <circle
                          cx="19.3939"
                          cy="158.788"
                          r="1.92424"
                          fill="currentColor"
                          stroke="currentColor"
                        />
                        <circle
                          cx="59.3939"
                          cy="158.788"
                          r="1.92424"
                          fill="currentColor"
                          stroke="currentColor"
                        />
                        <circle
                          cx="49.697"
                          cy="169.697"
                          r="1.92424"
                          fill="currentColor"
                          stroke="currentColor"
                        />
                        <circle
                          cx="29.0909"
                          cy="169.697"
                          r="1.92424"
                          fill="currentColor"
                          stroke="currentColor"
                        />
                        <circle
                          cx="19.3939"
                          cy="179.394"
                          r="1.92424"
                          fill="currentColor"
                          stroke="currentColor"
                        />
                        <circle
                          cx="38.7879"
                          cy="179.394"
                          r="1.92424"
                          fill="currentColor"
                          stroke="currentColor"
                        />
                        <circle
                          cx="59.3939"
                          cy="179.394"
                          r="1.92424"
                          fill="currentColor"
                          stroke="currentColor"
                        />
                      </svg>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane
                  tabId="2"
                  className="tab-pane"
                  id="v-pills-profile"
                  role="tabpanel"
                  aria-labelledby="design-tab"
                >
                  <Row className="gh-5 gv-5">
                    <div className="col-md">
                      <p>
                        Creepeth female let thing deep sea yielding it, void
                        midst third creepeth tree don't let upon greater. Their
                        good Living beast without great us you'll lights seasons
                        upon god.
                      </p>
                      <RouterLink
                        to="/services"
                        className="btn btn-light btn-with-ball"
                      >
                        read more
                        <span className="btn-ball" style={{ transform: "translateY(0px)" }}></span>
                      </RouterLink>
                    </div>
                    <Col className="col-auto mt-lg-n1 d-none d-md-block">
                      <svg
                        width="200"
                        height="200"
                        viewBox="0 0 200 200"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="11.5"
                          y="11.5"
                          width="177"
                          height="177"
                          stroke="currentColor"
                          strokeWidth="3"
                        />
                        <rect
                          x="1.5"
                          y="1.5"
                          width="24"
                          height="24"
                          fill="#0E0E0E"
                          stroke="currentColor"
                          strokeWidth="3"
                        />
                        <rect
                          x="1.5"
                          y="174.5"
                          width="24"
                          height="24"
                          fill="#0E0E0E"
                          stroke="currentColor"
                          strokeWidth="3"
                        />
                        <rect
                          x="174.5"
                          y="174.5"
                          width="24"
                          height="24"
                          fill="#0E0E0E"
                          stroke="currentColor"
                          strokeWidth="3"
                        />
                        <rect
                          x="174.5"
                          y="1.5"
                          width="24"
                          height="24"
                          fill="#0E0E0E"
                          stroke="currentColor"
                          strokeWidth="3"
                        />
                        <rect
                          x="77.5"
                          y="81.5"
                          width="78"
                          height="78"
                          fill="#0E0E0E"
                          stroke="currentColor"
                          strokeWidth="3"
                        />
                        <rect
                          x="41.5"
                          y="44.5"
                          width="78"
                          height="78"
                          fill="#0E0E0E"
                          stroke="currentColor"
                          strokeWidth="3"
                        />
                        <circle
                          cx="61.4242"
                          cy="63.4242"
                          r="1.92424"
                          fill="currentColor"
                          stroke="currentColor"
                        />
                        <circle
                          cx="80.8182"
                          cy="63.4242"
                          r="1.92424"
                          fill="currentColor"
                          stroke="currentColor"
                        />
                        <circle
                          cx="101.424"
                          cy="63.4242"
                          r="1.92424"
                          fill="currentColor"
                          stroke="currentColor"
                        />
                        <circle
                          cx="91.7272"
                          cy="73.121"
                          r="1.92424"
                          fill="currentColor"
                          stroke="currentColor"
                        />
                        <circle
                          cx="71.1211"
                          cy="73.121"
                          r="1.92424"
                          fill="currentColor"
                          stroke="currentColor"
                        />
                        <circle
                          cx="80.8182"
                          cy="82.8183"
                          r="1.92424"
                          fill="currentColor"
                          stroke="currentColor"
                        />
                        <circle
                          cx="61.4242"
                          cy="82.8183"
                          r="1.92424"
                          fill="currentColor"
                          stroke="currentColor"
                        />
                        <circle
                          cx="101.424"
                          cy="82.8183"
                          r="1.92424"
                          fill="currentColor"
                          stroke="currentColor"
                        />
                        <circle
                          cx="91.7272"
                          cy="93.727"
                          r="1.92424"
                          fill="currentColor"
                          stroke="currentColor"
                        />
                        <circle
                          cx="71.1211"
                          cy="93.727"
                          r="1.92424"
                          fill="currentColor"
                          stroke="currentColor"
                        />
                        <circle
                          cx="61.4242"
                          cy="103.424"
                          r="1.92424"
                          fill="currentColor"
                          stroke="currentColor"
                        />
                        <circle
                          cx="80.8182"
                          cy="103.424"
                          r="1.92424"
                          fill="currentColor"
                          stroke="currentColor"
                        />
                        <circle
                          cx="101.424"
                          cy="103.424"
                          r="1.92424"
                          fill="currentColor"
                          stroke="currentColor"
                        />
                      </svg>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane
                  tabId="3"
                  className="tab-pane"
                  id="development"
                  role="tabpanel"
                  aria-labelledby="development-tab"
                >
                  <Row className="gh-5 gv-5">
                    <div className="col-md">
                      <p>
                        Set image without divide the doesn't whales have tree
                        can't stars signs male may male over first can't for
                        were i second living for itself fourth that one give
                        lights.
                      </p>
                      <RouterLink
                        to="/services"
                        className="btn btn-light btn-with-ball"
                      >
                        read more
                        <span className="btn-ball" style={{ transform: "translateY(0px)" }}></span>
                      </RouterLink>
                    </div>
                    <Col className="col-auto mt-lg-n1 d-none d-md-block">
                      <svg
                        width="220"
                        height="184"
                        viewBox="0 0 220 184"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="125.848"
                          y="31.0544"
                          width="92.6522"
                          height="92.3368"
                          stroke="currentColor"
                          strokeWidth="3"
                        />
                        <path
                          d="M14.3086 124.345L87.0435 2.91903L159.778 124.345H14.3086Z"
                          fill="#0E0E0E"
                          stroke="currentColor"
                          strokeWidth="3"
                        />
                        <path
                          d="M173.543 136.332C173.543 161.825 152.807 182.5 127.217 182.5C101.628 182.5 80.8913 161.825 80.8913 136.332C80.8913 110.838 101.628 90.1632 127.217 90.1632C152.807 90.1632 173.543 110.838 173.543 136.332Z"
                          fill="#0E0E0E"
                          stroke="currentColor"
                          strokeWidth="3"
                        />
                        <path
                          d="M110.312 117.669C110.312 118.667 109.499 119.48 108.493 119.48C107.487 119.48 106.674 118.667 106.674 117.669C106.674 116.67 107.487 115.858 108.493 115.858C109.499 115.858 110.312 116.67 110.312 117.669Z"
                          fill="currentColor"
                          stroke="currentColor"
                        />
                        <path
                          d="M128.862 117.669C128.862 118.667 128.05 119.48 127.043 119.48C126.037 119.48 125.225 118.667 125.225 117.669C125.225 116.67 126.037 115.858 127.043 115.858C128.05 115.858 128.862 116.67 128.862 117.669Z"
                          fill="currentColor"
                          stroke="currentColor"
                        />
                        <path
                          d="M148.572 117.669C148.572 118.667 147.76 119.48 146.754 119.48C145.748 119.48 144.935 118.667 144.935 117.669C144.935 116.67 145.748 115.858 146.754 115.858C147.76 115.858 148.572 116.67 148.572 117.669Z"
                          fill="currentColor"
                          stroke="currentColor"
                        />
                        <path
                          d="M139.297 126.913C139.297 127.912 138.484 128.725 137.478 128.725C136.472 128.725 135.659 127.912 135.659 126.913C135.659 125.915 136.472 125.102 137.478 125.102C138.484 125.102 139.297 125.915 139.297 126.913Z"
                          fill="currentColor"
                          stroke="currentColor"
                        />
                        <path
                          d="M119.587 126.913C119.587 127.912 118.774 128.725 117.768 128.725C116.762 128.725 115.949 127.912 115.949 126.913C115.949 125.915 116.762 125.102 117.768 125.102C118.774 125.102 119.587 125.915 119.587 126.913Z"
                          fill="currentColor"
                          stroke="currentColor"
                        />
                        <path
                          d="M128.862 136.158C128.862 137.157 128.05 137.97 127.043 137.97C126.037 137.97 125.225 137.157 125.225 136.158C125.225 135.16 126.037 134.347 127.043 134.347C128.05 134.347 128.862 135.16 128.862 136.158Z"
                          fill="currentColor"
                          stroke="currentColor"
                        />
                        <path
                          d="M110.312 136.158C110.312 137.157 109.499 137.97 108.493 137.97C107.487 137.97 106.674 137.157 106.674 136.158C106.674 135.16 107.487 134.347 108.493 134.347C109.499 134.347 110.312 135.16 110.312 136.158Z"
                          fill="currentColor"
                          stroke="currentColor"
                        />
                        <path
                          d="M148.572 136.158C148.572 137.157 147.76 137.97 146.754 137.97C145.748 137.97 144.935 137.157 144.935 136.158C144.935 135.16 145.748 134.347 146.754 134.347C147.76 134.347 148.572 135.16 148.572 136.158Z"
                          fill="currentColor"
                          stroke="currentColor"
                        />
                        <path
                          d="M139.297 146.558C139.297 147.557 138.484 148.37 137.478 148.37C136.472 148.37 135.659 147.557 135.659 146.558C135.659 145.56 136.472 144.747 137.478 144.747C138.484 144.747 139.297 145.56 139.297 146.558Z"
                          fill="currentColor"
                          stroke="currentColor"
                        />
                        <path
                          d="M119.587 146.558C119.587 147.557 118.774 148.37 117.768 148.37C116.762 148.37 115.949 147.557 115.949 146.558C115.949 145.56 116.762 144.747 117.768 144.747C118.774 144.747 119.587 145.56 119.587 146.558Z"
                          fill="currentColor"
                          stroke="currentColor"
                        />
                        <path
                          d="M110.312 155.803C110.312 156.802 109.499 157.615 108.493 157.615C107.487 157.615 106.674 156.802 106.674 155.803C106.674 154.805 107.487 153.992 108.493 153.992C109.499 153.992 110.312 154.805 110.312 155.803Z"
                          fill="currentColor"
                          stroke="currentColor"
                        />
                        <path
                          d="M128.862 155.803C128.862 156.802 128.05 157.615 127.043 157.615C126.037 157.615 125.225 156.802 125.225 155.803C125.225 154.805 126.037 153.992 127.043 153.992C128.05 153.992 128.862 154.805 128.862 155.803Z"
                          fill="currentColor"
                          stroke="currentColor"
                        />
                        <path
                          d="M148.572 155.803C148.572 156.802 147.76 157.615 146.754 157.615C145.748 157.615 144.935 156.802 144.935 155.803C144.935 154.805 145.748 153.992 146.754 153.992C147.76 153.992 148.572 154.805 148.572 155.803Z"
                          fill="currentColor"
                          stroke="currentColor"
                        />
                      </svg>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane
                  tabId="4"
                  className="tab-pane"
                  id="release"
                  role="tabpanel"
                  aria-labelledby="release-tab"
                >
                  <Row className="gh-5 gv-5">
                    <div className="col-lg">
                      <p>
                        Their behold is sea you'll cattle also together fowl day
                        moved forth fish fowl every give fowl. Fruit subdue
                        firmament i living won't waters called signs heaven
                        can't, fifth days.
                      </p>
                      <RouterLink
                        to="/services"
                        className="btn btn-light btn-with-ball"
                      >
                        read more
                        <span className="btn-ball" style={{ transform: "translateY(0px)" }}></span>
                      </RouterLink>
                    </div>
                    <Col className="col-auto mt-lg-n1 d-none d-md-block">
                      <svg
                        width="200"
                        height="200"
                        viewBox="0 0 200 200"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="1.5"
                          y="1.5"
                          width="144"
                          height="144"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeDasharray="6 6"
                        />
                        <rect
                          x="54.5"
                          y="54.5"
                          width="144"
                          height="144"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeDasharray="6 6"
                        />
                        <rect
                          x="54.5"
                          y="53.5"
                          width="92"
                          height="92"
                          fill="#0E0E0E"
                          stroke="currentColor"
                          strokeWidth="3"
                        />
                        <circle
                          cx="81.4242"
                          cy="79.4242"
                          r="1.92424"
                          fill="currentColor"
                          stroke="currentColor"
                        />
                        <circle
                          cx="100.818"
                          cy="79.4242"
                          r="1.92424"
                          fill="currentColor"
                          stroke="currentColor"
                        />
                        <circle
                          cx="121.424"
                          cy="79.4242"
                          r="1.92424"
                          fill="currentColor"
                          stroke="currentColor"
                        />
                        <circle
                          cx="111.727"
                          cy="89.121"
                          r="1.92424"
                          fill="currentColor"
                          stroke="currentColor"
                        />
                        <circle
                          cx="91.1211"
                          cy="89.121"
                          r="1.92424"
                          fill="currentColor"
                          stroke="currentColor"
                        />
                        <circle
                          cx="100.818"
                          cy="98.8183"
                          r="1.92424"
                          fill="currentColor"
                          stroke="currentColor"
                        />
                        <circle
                          cx="81.4242"
                          cy="98.8183"
                          r="1.92424"
                          fill="currentColor"
                          stroke="currentColor"
                        />
                        <circle
                          cx="121.424"
                          cy="98.8183"
                          r="1.92424"
                          fill="currentColor"
                          stroke="currentColor"
                        />
                        <circle
                          cx="111.727"
                          cy="109.727"
                          r="1.92424"
                          fill="currentColor"
                          stroke="currentColor"
                        />
                        <circle
                          cx="91.1211"
                          cy="109.727"
                          r="1.92424"
                          fill="currentColor"
                          stroke="currentColor"
                        />
                        <circle
                          cx="81.4242"
                          cy="119.424"
                          r="1.92424"
                          fill="currentColor"
                          stroke="currentColor"
                        />
                        <circle
                          cx="100.818"
                          cy="119.424"
                          r="1.92424"
                          fill="currentColor"
                          stroke="currentColor"
                        />
                        <circle
                          cx="121.424"
                          cy="119.424"
                          r="1.92424"
                          fill="currentColor"
                          stroke="currentColor"
                        />
                      </svg>
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default WorkProcess;
