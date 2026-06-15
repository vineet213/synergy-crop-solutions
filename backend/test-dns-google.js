import dns from "dns";
import dnsPromises from "dns/promises";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

try {
  const result = await dnsPromises.resolveSrv(
    "_mongodb._tcp.synergy-crop-solutions.wbv2zh1.mongodb.net"
  );

  console.log("SUCCESS");
  console.log(result);
} catch (error) {
  console.error("FAILED");
  console.error(error);
}
