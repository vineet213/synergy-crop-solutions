import dns from "dns/promises";

try {
  const result = await dns.resolveSrv(
    "_mongodb._tcp.synergy-crop-solutions.wbv2zh1.mongodb.net"
  );

  console.log("SUCCESS");
  console.log(result);
} catch (error) {
  console.error("FAILED");
  console.error(error);
}