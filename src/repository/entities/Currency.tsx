import BigNumber from "bignumber.js";
import { ChainType } from "src/servises/network/ChainType";

const MATIC = require("src/assets/images/matic.svg") as string;

export class Currency {
  public convertFromWei(result: string) {
    return new BigNumber(result).div(10 ** this.decimals).toNumber();
  }

  public convertToWei(value: number): string {
    return new BigNumber(value).multipliedBy(10 ** this.decimals).toFixed();
  }

  public static MATIC = new Currency(
    "MATIC",
    18,
    new BigNumber(0),
    ChainType.POLYGON,
    null,
    MATIC
  );

  public symbol: string;
  public decimals: number;
  public value: BigNumber;
  public chain: ChainType;
  public address: any;
  public logo: any;

  constructor(
    symbol: string,
    decimals: number,
    value: BigNumber,
    chain: ChainType,
    address: any,
    logo: any
  ) {
    this.symbol = symbol;
    this.decimals = decimals;
    this.value = value;
    this.chain = chain;
    this.address = address;
    this.logo = logo;
  }
}
