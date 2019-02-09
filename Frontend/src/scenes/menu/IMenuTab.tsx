import { IWine } from "../../components/wines/Wine";

export interface IMenuTab {
  id: number;
  name: string;
  wines: IWine[];
}
