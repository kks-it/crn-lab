import logoAsset from "../assets/crn-lab-logo.jpeg";

const appConfig = {
  brandName: "CRN Path Lab",
  apiBaseUrl: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
  brandTagline: "Classic pathology care with modern convenience.",
  logo: {
    mode: "asset",
    asset: logoAsset,
    url: "",
    alt: "CRN Lab logo",
  },
  support: {
    phone: "+91 98765 43210",
    email: "care@crnlab.com",
    address: "24 Clinical Avenue, Hyderabad",
  },
};

export default appConfig;
