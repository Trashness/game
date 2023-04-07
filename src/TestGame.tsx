import { useEffect, useState } from "react";
import { AppButton } from "src/components/AppButton";
import { AppInput } from "src/components/AppInput";
import AppValue from "src/components/AppValue";
import { Currency } from "src/repository/entities/Currency";
import { ChainType } from "src/servises/network/ChainType";
import { addressShortener } from "src/utils/StringUtils";
import BigNumber from "bignumber.js";
import AppTable from "src/components/table/AppTable";
import AppTableRow from "src/components/table/AppTableRow";
import AppTableCol from "src/components/table/AppTableCol";
import HintBlock from "./components/HintBlock";
import AppTableHeaderCol from "src/components/table/AppTableHeaderCol";
import { сopyToClipboard } from "src/utils/CopyToClipboard";
import { Contract } from "web3-eth-contract";
import ERC20 from "src/repository/source/ethereum/abi/ERC20.json";
import { AbiItem } from "web3-utils";
import Theme from "./components/theme";
import { ChakraProvider, useDisclosure } from "@chakra-ui/react";
import ConnectButton from "src/components/ConnectButton";
import AccountModal from "./components/AccountModal";
import { useEthers } from "@usedapp/core";
import Web3 from "web3";

const TestGame = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { account, chainId } = useEthers();
  const [walletsBalances, setWalletsBalances] = useState<
    Map<string, Currency[]>
  >(new Map());

  const walletsNames: Map<string, string> = new Map([
    ["0x2C39b0d4390aB24658b57EcAe1C07fa171cb858f", "Семен Синицын"],
    ["0x0Ea09B8cC1c50ABa461be9A2A60deE1Be31fed8A", "Мария Игнатьева"],
    ["0xF3f6e35aB2Fefe8d45e60715dd4acfb9b1a13bBB", "Олег Вислов"],
    ["0x72598a991BAdD8195Df352710d14b75A02cC2195", "Павел Т"],
    ["0x193ab79E5B5FBc6Eb303deF30A3c32D24178E571", "Илья К"],
    ["0x2bE45095521dd63Cf880C24CDace74449d603DFa", "Эдуард К"],
    ["0xb370eC2782B74e087C06e63435542a636b658fFC", "Ирина Мультан"],
    ["0xeB0ea44144087f4e11aa433760e8747E21142dF6", "Татьяна Владимирова"],
    ["0xBEF7b2164224CC64B6E2693c21E60e18d646D157", "Александр Дягилев"],
    ["0x6B99baE0295cA22FaF62E4e821965271D84da0Cb", "Лилия Р"],
    ["0x94Cbe46690867A5F7455E52598D1dE2a04234d5B", "Василий Трофимчук"],
  ]);

  const walletsToFetch = [
    "0x2C39b0d4390aB24658b57EcAe1C07fa171cb858f",
    "0x6B99baE0295cA22FaF62E4e821965271D84da0Cb",
    "0x0Ea09B8cC1c50ABa461be9A2A60deE1Be31fed8A",
    "0xF3f6e35aB2Fefe8d45e60715dd4acfb9b1a13bBB",
    "0x72598a991BAdD8195Df352710d14b75A02cC2195",
    "0x193ab79E5B5FBc6Eb303deF30A3c32D24178E571",
    "0x2bE45095521dd63Cf880C24CDace74449d603DFa",
    "0xb370eC2782B74e087C06e63435542a636b658fFC",
    "0x94Cbe46690867A5F7455E52598D1dE2a04234d5B",
    "0xeB0ea44144087f4e11aa433760e8747E21142dF6",
    "0xBEF7b2164224CC64B6E2693c21E60e18d646D157",
  ];

  const tokensToFetch: Currency[] = [
    Currency.MATIC,
    new Currency(
      "TOK",
      2,
      new BigNumber(0), ///always 0
      ChainType.POLYGON,
      "0xF385Da740B7aa9d5A9170e8673423339089Da55D",
      ""
    ),
    new Currency(
      "PPL",
      0, //decimals amount
      new BigNumber(0),
      ChainType.POLYGON,
      "0xd5802CEC841d3E9Abc99453bDF51fBB706E03689",
      ""
    ),
    new Currency(
      "Soup",
      0,
      new BigNumber(0), ///always 0
      ChainType.POLYGON,
      "0xC764a929a3284A842a6C26CC998553199A93c741",
      ""
    ),
  ];

  /* @ts-ignore */
  let web3 = new Web3(window.ethereum);

  useEffect(() => {
    /* @ts-ignore */
    if (chainId) {
      walletsBalance();
    }
  }, [chainId]);

  const walletsBalance = async () => {
    const newData = new Map(walletsBalances);
    await Promise.all(
      walletsToFetch.map((walletaddress) =>
        Promise.all(
          tokensToFetch.map(async (token) => {
            const contract: Contract = new web3!.eth.Contract(
              ERC20 as AbiItem[],
              token.address
            ) as any;
            let balance = 0;
            if (token.address) {
              try {
                if (
                  token.address === "0xC764a929a3284A842a6C26CC998553199A93c741"
                ) {
                  balance = await contract.methods
                    .balanceOf(walletaddress, 0)
                    .call();
                } else {
                  balance = await contract.methods
                    .balanceOf(walletaddress)
                    .call();
                }
                if (token.decimals > 0) {
                  balance = balance / 10 ** token.decimals;
                }
              } catch (e) {
                balance = 0;
              }
            } else {
              balance = await web3.eth.getBalance(walletaddress) as unknown as number;
            }
            let thisvalue = new BigNumber(balance);
            token.value = thisvalue;
            return token;
          })
        ).then((result) => {
          newData.set(walletaddress, result);
        })
      )
    ).then(() => setWalletsBalances(newData));
  };
  

  const sendTokens = async (
    tokenAddress: string | undefined,
    userAddress: string,
    amount: string
  ) => {
    const contract: Contract = new web3!.eth.Contract(
      ERC20 as AbiItem[],
      tokenAddress
    ) as any;
    if (tokenAddress)
      await contract.methods
        .transferFrom(
          account,
          userAddress,
          Currency.MATIC.convertToWei(parseFloat(amount))
        )
        .call();
    else
      await web3!.eth.sendTransaction({
        to: userAddress,
        from: account,
        value: Currency.MATIC.convertToWei(parseFloat(amount)),
      });
  };
  
  const addToken = async () => {
    if (web3) {
      await (web3.currentProvider as any).request(
        {
          method: "wallet_watchAsset",
          params: {
            type: "ERC20",
            options: {
              address: "0xF385Da740B7aa9d5A9170e8673423339089Da55D",
              symbol: "TOK",
              decimals: 2,
              image: "",
            },
          },
          id: 25,
        },
        (err: any, result: any) => {
          if (err) {
            return console.error(err);
          } else {
            return console.log(result.result);
          }
        }
      );
    }
  };

  const columnWidth = "calc(100%/5)"; //divide on number of columns
  return (
    <ChakraProvider>
      <Theme>
        <ConnectButton handleOpenModal={onOpen} />
        <AccountModal isOpen={isOpen} onClose={onClose} />
        <AppButton
          onClick={async () => (account ? await addToken() : chainId)}
          style={{
            margin: "auto",
            padding: "10px 15px",
          }}
        >
          Add TOK token
        </AppButton>

        <AppTable>
          <AppTableRow>
            <AppTableHeaderCol width={columnWidth}>Name</AppTableHeaderCol>
            <AppTableHeaderCol width={columnWidth}>Wallet</AppTableHeaderCol>
            {tokensToFetch.map((token, index) => (
              <AppTableHeaderCol width={columnWidth} key={index}>
                {token.symbol} Amount
              </AppTableHeaderCol>
            ))}
          </AppTableRow>
          {[...walletsBalances.keys()].length > 0 ? (
            walletsToFetch.map((item, index) => (
              <AppTableRow key={index}>
                <AppTableCol width={columnWidth}>
                  {walletsNames.get(item)}
                </AppTableCol>
                <AppTableCol width={columnWidth}>
                  <>
                    {addressShortener(item, [6, 6])}
                    <button onClick={() => сopyToClipboard(item)}></button>
                  </>
                </AppTableCol>
                {walletsBalances.get(item)?.map((currency, ind) => (
                  <AppTableCol key={ind} width={columnWidth}>
                    <AppValue
                      value={Currency.MATIC.convertFromWei(
                        currency.value.toString()
                      )}
                      currency={currency}
                      chain={currency.chain}
                      roundingFloat
                    >
                      &nbsp;{currency.symbol}
                    </AppValue>
                    <form
                      style={{
                        width: "auto",
                        display: "flex",
                        flexFlow: "row nowrap",
                        gap: "5px",
                      }}
                      onSubmit={async (e) => {
                        e.preventDefault();
                        await sendTokens(
                          currency.address ?? undefined,
                          item,
                          (e.target[0] as HTMLInputElement).value
                        );
                      }}
                    >
                      <AppInput
                        onChange={() => null}
                        name="amount"
                        placeholder={"amount"}
                        style={{
                          height: "26px",
                          width: "75px",
                        }}
                        autoComplete={"off"}
                      />
                      <AppButton
                        name="submit"
                        type="submit"
                        style={{
                          height: "26px",
                        }}
                      >
                        Send
                      </AppButton>
                    </form>
                  </AppTableCol>
                ))}
              </AppTableRow>
            ))
          ) : (
            <HintBlock text="loading or no data..." />
          )}
        </AppTable>
      </Theme>
    </ChakraProvider>
  );
};

export default TestGame
