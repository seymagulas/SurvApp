export interface DecodedJwtPayload {
  id: string;
  // Add other properties from your JWT payload if needed
  [key: string]: any; // Allow any additional properties
}
export interface UserDetailsResponse {
  _id: string;
  name: string;
  email: string;
}
