const allowedOrigins = [
  "http://localhost:5173",
  "https://e-commerce-frontend-sunilbarewar.vercel.app",
  "https://e-commerce-frontend-iota-nine.vercel.app",
];

const corsOptions = {
  origin: (origin: any, callback: Function) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

export default corsOptions;
