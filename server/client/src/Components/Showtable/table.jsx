import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./table.css";
const Table = (props) => {
  let navigate = useNavigate();
  const { Data } = props;

  const { sign: logo } = useSelector((state) => state.currency);
  const MinimalNumber = (num) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(2) + "B";
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(2) + "K";
    } else {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  };

  return (
    <div className="main-table">
      <table>
        <thead className="main-table-thead">
          <tr>
            <th>Name</th>
            <th>Rank</th>
            <th className="non-mobile">Image</th>
            <th className="non-mobile">Symbol</th>
            <th>Current Price</th>
            <th className="non-mobile">Market Cap</th>
            {/* <th className="non-mobile">total_volume</th> */}
            <th>Gain</th>
          </tr>
        </thead>
        {Data.map((item) => {
          const {
            uuid,
            rank,
            symbol,
            name,
            iconUrl,
            price,
            marketCap,
            change,
          } = item;
          let current_price = Number(price).toFixed(2);

          return (
            <tbody
              className="main-table-tbody "
              key={uuid}
              onClick={() => {
                navigate(`/${uuid}`);
              }}
            >
              <tr className="data-row">
                <td>{rank}</td>
                <td>{name}</td>
                <td className="non-mobile">
                  <img src={iconUrl} alt={name} width={30} />
                </td>
                <td className="non-mobile">{symbol}</td>

                <td>
                  {logo + " "}
                  {current_price < 0.00001
                    ? "<0.00001"
                    : MinimalNumber(current_price)}
                </td>
                <td className="non-mobile">
                  {marketCap === null
                    ? "-"
                    : logo + " " + MinimalNumber(marketCap)}
                </td>
                {/* <td className="non-mobile">
                  {total_volume
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </td> */}
                <td>
                  {Math.abs(change)}
                  {change > 0 ? (
                    <span className="up-arrow">&#x2197;</span>
                  ) : (
                    <span className="down-arrow">&#x2198;</span>
                  )}
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
};

export default Table;
