// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {
  DestinationDetailsType,
  DestinationItineraryType,
  DetailedIntinearyType,
  PackageIteniaryType,
} from "@/types/trips";
import { Page } from "puppeteer";
interface PackageType {
  id: string;
  name: string;
  nights: number;
  days: number;
  inclusions: string[];
  price: number;
}

interface PackageDetailsType {
  description: string;
  images: string[];
  themes: string[];
  detailedIntineary: DetailedIntinearyType[];
  destinationItinerary: DestinationItineraryType[];
  destinationDetails: DestinationDetailsType[];
  packageIteniary: PackageIteniaryType[];
}

export const startPackageScraping = async (page: Page, pkg: PackageType) => {
  const packageDetails = await page.evaluate(() => {
    const packageDetails: PackageDetailsType = {
      description: "",
      images: [],
      themes: [],
      detailedIntineary: [],
      destinationItinerary: [],
      destinationDetails: [],
      packageIteniary: [],
    };
    const packageElement = document.querySelector("#main-container");
    const descriptionSelector = packageElement?.querySelector("#pkgOverView");
    const regex = new RegExp("Yatra", "gi");
    descriptionSelector?.querySelector(".readMore")?.click();
    packageDetails.description = packageElement
      ?.querySelector("#pkgOverView p")
      ?.innerHTML.replace(regex, "TripScape") as string;
    return packageDetails;
  });
  const details = { ...pkg, ...packageDetails };
  return details;
};
