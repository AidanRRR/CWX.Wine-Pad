import { IWine } from "../../models/Wine";

export interface IMenuTab {
  id: number;
  name: string;
  wines: IWine[];
}
