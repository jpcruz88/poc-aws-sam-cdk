const config = {
  tableName: process.env.TABLE_NAME || "t_whatsapp",
  region: process.env.AWS_REGION || "us-east-1",
  endpointUrl: "https://reqres.in/api/users",
};

export default config;
