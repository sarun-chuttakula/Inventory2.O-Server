import AppDataSource from "../configs/data-source";
import {
  AC,
  Airpurifier,
  Biometrix,
  Desktop,
  Keyboard,
  Laptop,
  Monitor,
  Mouse,
  Printer,
  Router,
  TV,
  Tab,
  UPS,
} from "../models";

export const getallassets = async (
  asset_type: string,
  page: string
): Promise<any> => {
  console.log(asset_type, "asset_type");
  console.log(page, "page");
  const pageSize = 25;
  const skip = (Number(page) - 1) * pageSize;

  const acRepository = AppDataSource.getRepository(AC);
  const airpurifierRepository = AppDataSource.getRepository(Airpurifier);
  const biometrixRepository = AppDataSource.getRepository(Biometrix);
  const desktopRepository = AppDataSource.getRepository(Desktop);
  const keyboardRepository = AppDataSource.getRepository(Keyboard);
  const laptopRepository = AppDataSource.getRepository(Laptop);
  const monitorRepository = AppDataSource.getRepository(Monitor);
  const mouseRepository = AppDataSource.getRepository(Mouse);
  const printerRepository = AppDataSource.getRepository(Printer);
  const routerRepository = AppDataSource.getRepository(Router);
  const tabRepository = AppDataSource.getRepository(Tab);
  const tvRepository = AppDataSource.getRepository(TV);
  const upsRepository = AppDataSource.getRepository(UPS);

  const repositories = {
    ac: acRepository,
    airpurifier: airpurifierRepository,
    biometrix: biometrixRepository,
    desktop: desktopRepository,
    keyboard: keyboardRepository,
    laptop: laptopRepository,
    monitor: monitorRepository,
    mouse: mouseRepository,
    printer: printerRepository,
    router: routerRepository,
    tab: tabRepository,
    tv: tvRepository,
    ups: upsRepository,
  };

  let allassets;

  switch (asset_type) {
    case "":
      const fetchPromises = Object.values(repositories).map((repository) =>
        repository.find({ skip, take: pageSize })
      );
      allassets = await Promise.all(fetchPromises);
      break;
    case "ac":
    case "airpurifier":
    case "biometrix":
    case "desktop":
    case "keyboard":
    case "laptop":
    case "monitor":
    case "mouse":
    case "printer":
    case "router":
    case "tab":
    case "tv":
    case "ups":
      allassets = await repositories[asset_type].find({ skip, take: pageSize });
      break;
    default:
      // handle unknown asset type
      break;
  }

  console.log(allassets, "dfgh");

  return allassets;
};
