import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const authMiddlewareJWT = (req: Request, res: Response, next: NextFunction) => {
  console.log("Auth Middleware Invoked");

  // Extrae el token de las cookies
  const token = req.cookies.authToken;
  console.log("Token in cookies:", token);

  if (!token) {
    console.log("Token missing in cookies");
    return res.status(401).json({ error: "Token not provided" });
  }

  // Verifica el token
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error("JWT secret not defined");
    return res.status(500).json({ error: "Server configuration error" });
  }

  try {
    // Verifica y decodifica el token
    const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
    console.log("Decoded token:", decoded);
    (req as any).user = decoded; // Agrega el usuario decodificado a la solicitud
    return next();
  } catch (err) {
    console.log("Invalid token", err);
    return res.status(403).json({ error: "Invalid token" });
  }
};

export default authMiddlewareJWT;
