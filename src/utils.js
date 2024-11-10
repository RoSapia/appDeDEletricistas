import { jwtDecode } from "jwt-decode";

export function getPayloadFromToken(token) {
  try {
    const payload = jwtDecode(token);
    return payload;
  } catch (error) {
    console.error("Erro ao decodificar o token:", error);
    return null;
  }
}
