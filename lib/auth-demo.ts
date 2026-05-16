import { SignJWT, jwtVerify } from "jose";
import { DEMO_CREDENTIAL, CLIENTE, ESCRITORIO } from "./mock-data";

const SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET ?? "demo-secret-dev-only-change-in-production"
);

const COOKIE_NAME = "c360_session";
const COOKIE_MAX_AGE = 60 * 60 * 8; // 8 horas

export type SessionPayload = {
  clienteId: string;
  clienteNome: string;
  escritorioNome: string;
  exp?: number;
};

export async function signSession(payload: Omit<SessionPayload, "exp">): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(SECRET);
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export function validateDemoCredential(
  email: string,
  password: string
): boolean {
  return (
    email.toLowerCase() === DEMO_CREDENTIAL.email.toLowerCase() &&
    password === DEMO_CREDENTIAL.password
  );
}

export function getDemoSession(): Omit<SessionPayload, "exp"> {
  return {
    clienteId: CLIENTE.id,
    clienteNome: CLIENTE.nomeFantasia,
    escritorioNome: ESCRITORIO.nome,
  };
}

export { COOKIE_NAME, COOKIE_MAX_AGE };
