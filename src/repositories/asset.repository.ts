import { Repository } from "typeorm";
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
  Projector,
  Router,
  TV,
  Tab,
  UPS,
} from "../models";

// Define a type for the repository instances
type RepositoryMap = {
  [key: string]: Repository<any>; // Repository instances can be of any type
};

const repositoriesMap: RepositoryMap = {
  ac: AppDataSource.getRepository(AC),
  airpurifier: AppDataSource.getRepository(Airpurifier),
  biometrix: AppDataSource.getRepository(Biometrix),
  desktop: AppDataSource.getRepository(Desktop),
  keyboard: AppDataSource.getRepository(Keyboard),
  laptop: AppDataSource.getRepository(Laptop),
  monitor: AppDataSource.getRepository(Monitor),
  mouse: AppDataSource.getRepository(Mouse),
  printer: AppDataSource.getRepository(Printer),
  projector: AppDataSource.getRepository(Projector),
  router: AppDataSource.getRepository(Router),
  tab: AppDataSource.getRepository(Tab),
  tv: AppDataSource.getRepository(TV),
  ups: AppDataSource.getRepository(UPS),
};

export const getallassets = async (
  asset_type: string,
  page: string
): Promise<any> => {
  try {
    console.log(asset_type, "asset_type");
    console.log(page, "page");
    const pageSize = 25;
    const skip = (Number(page) - 1) * pageSize;

    if (asset_type === "all") {
      console.log("all assets");
      const allAssets: { asset_type: string; values: any[] }[] = [];

      // Fetch items for each asset type and store them in the allAssets array
      for (const assetType in repositoriesMap) {
        if (repositoriesMap.hasOwnProperty(assetType)) {
          const assets = await repositoriesMap[assetType].find({
            skip,
            take: pageSize,
          });
          allAssets.push({ asset_type: assetType, values: assets });
        }
      }

      return allAssets;
    } else if (repositoriesMap.hasOwnProperty(asset_type)) {
      const assets = await repositoriesMap[asset_type].find({
        skip,
        take: pageSize,
      });
      return [{ asset_type, values: assets }];
    } else {
      throw new Error("Unknown asset type");
    }
  } catch (error) {
    console.error("Error in getallassets:", error);
    throw error; // rethrowing the error for the caller to handle
  }
};
