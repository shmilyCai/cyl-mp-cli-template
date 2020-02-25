const releaseIP = "生产环境";
const testIP = "体验环境";
const devIP = "开发环境";

const CheckVersion = () => {
  console.log("envVersion", __wxConfig.envVersion);
  let version = __wxConfig.envVersion;
  switch (version) {
    case "develop":
      // 开发环境
      return devIP;
      break;
    case "trial":
      // 体验环境
      return testIP;
      break;
    case "release":
      // 线上环境
      return releaseIP;
      break;
    default:
      return releaseIP;
  }
};

const IP = CheckVersion();

export default {
  base_url: `${IP}/`,
  return_code: {
    success: 200,
    fail: -1
  }
};
