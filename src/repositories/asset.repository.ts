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

export const getallassets = async (): Promise<any> => {
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
  const allassets = await Promise.all([
    acRepository.find(),
    airpurifierRepository.find(),
    biometrixRepository.find(),
    desktopRepository.find(),
    keyboardRepository.find(),
    laptopRepository.find(),
    monitorRepository.find(),
    mouseRepository.find(),
    printerRepository.find(),
    routerRepository.find(),
    tabRepository.find(),
    tvRepository.find(),
    upsRepository.find(),
  ]);
  return allassets;
};
