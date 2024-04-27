import { FC } from "react";
import { AutoItem, ResultItem } from "../../common.types";

export type CellProps<T extends ResultItem> = {
	item: T
}

export type GenericResultCell<T extends ResultItem> = FC<CellProps<T>>

export type ResultCellComp = GenericResultCell<AutoItem>