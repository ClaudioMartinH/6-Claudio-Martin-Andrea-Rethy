import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const authMiddlewareJWT = (req: Request, res: Response, next: NextFunction) => {
  console.log("Auth Middleware Invoked");

  // Extrae el token del headers
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  console.log("Token in Authorization header:", token);

  if (!token) {
    console.log("Token missing in headers");
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
