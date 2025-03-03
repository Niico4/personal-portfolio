export const EnvConfig = {
  db: process.env.DATABASE_URL,
  public_key: process.env.NEXT_PUBLIC_PUBLICKEY,
  url_endpoint:
    process.env.NEXT_PUBLIC_URL_ENDPOINT ?? 'https://ik.imagekit.io/0isq9u6sl/',
  private_key: process.env.PRIVATE_KEY,
  node_env: process.env.NODE_ENV,
};
