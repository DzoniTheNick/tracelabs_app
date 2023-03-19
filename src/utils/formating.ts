import React from "react";

import { normalTxStyle, tokenTxStyle } from "../res/values";
import { FormatedNormalTx, FormatedTokenTx } from "./utils"

const createTableRow = (transaction: FormatedNormalTx | FormatedTokenTx): React.DetailedReactHTMLElement<React.HTMLAttributes<HTMLElement>, HTMLElement> => {
    const date: Date = transaction.date;

    const fYear: string = `${date.getFullYear()}`;
    const fMonth: string = date.getUTCMonth() + 1 > 9 ? `${date.getUTCMonth() + 1}` : `0${date.getUTCMonth() + 1}`;
    const fDay: string = date.getUTCDate() > 9 ? `${date.getUTCDate()}` : `0${date.getUTCDate()}`;
    const fHours: string = date.getUTCHours() > 9 ? `${date.getUTCHours()}` : `0${date.getUTCHours()}`;
    const fMinutes: string = date.getUTCMinutes() > 9 ? `${date.getUTCMinutes()}` : `0${date.getUTCMinutes()}`;
    const fSeconds: string = date.getUTCSeconds() > 9 ? `${date.getUTCSeconds()}` : `0${date.getUTCSeconds()}`;

    const formatedDate: string = `${fYear}-${fMonth}-${fDay} ${fHours}:${fMinutes}:${fSeconds}`;

    const to: string = `https://etherscan.io/address/${transaction.to}`;
    const from: string = `https://etherscan.io/address/${transaction.from}`;
    const hash: string = `https://etherscan.io/tx/${transaction.txHash}`;

    let style: React.CSSProperties = normalTxStyle;

    if((transaction as FormatedTokenTx).tokenName) {
        style = tokenTxStyle;
    };

    console.log(tokenTxStyle);

    const tableRow = React.createElement("tr", undefined, [
        React.createElement("td", { id: 'type' }, [
            React.createElement("p", { style: style }, transaction.type)
        ]),
        React.createElement("td", {id: 'hash'}, [
            React.createElement("a", {href: hash, target: '_blank', rel:'noreferrer', style: {textDecoration: 'none'}}, [
                React.createElement("p", undefined, transaction.txHash)
            ])
        ]),
        React.createElement("td", {id: 'time'}, [
            React.createElement("p", undefined, formatedDate)
        ]),
        React.createElement("td", {id: 'from'}, [
            React.createElement("a", {href: from, target: '_blank', rel:'noreferrer', style: {textDecoration: 'none'}}, [
                React.createElement("p", undefined, transaction.from)
            ])
        ]),
        React.createElement("td", {id: 'to'}, [
            React.createElement("a", {href: to, target: '_blank', rel:'noreferrer', style: {textDecoration: 'none'}}, [
                React.createElement("p", undefined, transaction.to)
            ])
        ]),
        React.createElement("td", {id: 'value'}, [
            React.createElement("p", undefined, transaction.value)
        ]),
        React.createElement("td", {id: 'total-fees'}, [
            React.createElement("p", undefined, transaction.totalFee)
        ]),
    ]);

    return tableRow;
};

export { createTableRow }