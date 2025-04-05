// import {
//     DashboardIcon,
//     user_dash,
//     wallet_dash,
//     transaction_dash,
//     fee_dash,
//     notification_dash,
//     kyc_dash,
//     market_dash,
//     security_dash,
//     report_dash,
//     log_dash,
//     support_dash,
//     setting_dash,
//     market
//   } from "../constants/Images";



// exporting topbar imgs
export const Topbar_profile_Left = [
  {
    "profileImage": "https://randomuser.me/api/portraits/men/44.jpg"
  },
  {
    "profileImage": "https://randomuser.me/api/portraits/men/45.jpg"
  },
  {
    "profileImage": "https://randomuser.me/api/portraits/women/46.jpg"
  },
  {
    "profileImage": "https://randomuser.me/api/portraits/men/47.jpg"
  },
  {
    "profileImage": "https://randomuser.me/api/portraits/men/48.jpg"
  }
]




//  ______________________________Dashboard Dummy______________________
export const dashboard_legends = [
  { color: "#126EB9", label: "Users" },
  { color: "#78CA19", label: "Transactions" },
  { color: "#B95A12", label: "Revenue" },
  { color: "#CA1919", label: "Wallet" },
];
export const Dashboard_categoryOptions = [
  { value: "users", name: "Users" },
  { value: "transactions", name: "Transactions" },
  { value: "revenue", name: "Revenue" },
  { value: "wallet", name: "Wallet" },
];

export const Dashboard_periodOptions = [
  { value: "monthly", name: "Monthly" },
  { value: "yearly", name: "Yearly" },
  { value: "weekly", name: "Weekly" },
];

export const Dashboard_cryptoWallet = [
  {
    "crypto_name": 'BTC',
    "value": '3.01'
  },
  {
    "crypto_name": 'BTC',
    "value": '4.01'
  },
  {
    "crypto_name": 'BTC',
    "value": '4.01'
  },
  {
    "crypto_name": 'BTC',
    "value": '5.01'
  },
  {
    "crypto_name": 'BTC',
    "value": '5.25'
  },
  {
    "crypto_name": 'BTC',
    "value": '0.01'
  },
  {
    "crypto_name": 'BTC',
    "value": '1.01'
  },
  {
    "crypto_name": 'BTC',
    "value": '7.01'
  },
  {
    "crypto_name": 'BTC',
    "value": '7.01'
  },
  {
    "crypto_name": 'BTC',
    "value": '9.01'
  },
]




//  ______________________________User Management Dummy______________________
export const users_table = [
  {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "07033484845",
    "status": "online"
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane.smith@example.com",
    "phone": "07033484845",
    "status": "offline"
  },
  {
    "id": 3,
    "name": "Alice Johnson",
    "email": "alice.johnson@example.com",
    "phone": "07033484845",
    "status": "online"
  },
  {
    "id": 4,
    "name": "Bob Brown",
    "email": "bob.brown@example.com",
    "phone": "07033484845",
    "status": "offline"
  },
  {
    "id": 5,
    "name": "Charlie Davis",
    "email": "charlie.davis@example.com",
    "phone": "07033484845",
    "status": "online"
  },
  {
    "id": 6,
    "name": "Emily Wilson",
    "email": "emily.wilson@example.com",
    "phone": "07033484845",
    "status": "offline"
  }
];


export const market_data = [
  {
    "symbol": "BTC",
    "name": "Bitcoin",
    "price": "$95,456.34",
    "change_24h": "▲0.04%",
    "change_7d": "▲0.04%",
    "change_30d": "▼10.04%",
    "market_cap": "$1,945,345,345,245",
    "volume": "$32,345,345,345",
    "supply": "19,234,345 BTC"
  },
  {
    "symbol": "USDT",
    "name": "Tether",
    "price": "$1.00",
    "change_24h": "▲0.01%",
    "change_7d": "▼0.02%",
    "change_30d": "▲0.10%",
    "market_cap": "$85,345,345,245",
    "volume": "$45,345,345,345",
    "supply": "83,234,345,345 USDT"
  },
  {
    "symbol": "TRX",
    "name": "Tron",
    "price": "$0.093",
    "change_24h": "▲1.34%",
    "change_7d": "▲2.56%",
    "change_30d": "▼5.12%",
    "market_cap": "$10,345,345,245",
    "volume": "$5,345,345,345",
    "supply": "93,234,345,345 TRX"
  },
  {
    "symbol": "SOL",
    "name": "Solana",
    "price": "$154.32",
    "change_24h": "▼0.54%",
    "change_7d": "▲4.23%",
    "change_30d": "▼7.89%",
    "market_cap": "$75,345,345,245",
    "volume": "$32,345,345,345",
    "supply": "432,234,345 SOL"
  },
  {
    "symbol": "ETH",
    "name": "Ethereum",
    "price": "$3,456.78",
    "change_24h": "▲0.20%",
    "change_7d": "▲1.50%",
    "change_30d": "▼3.20%",
    "market_cap": "$345,345,345,245",
    "volume": "$22,345,345,345",
    "supply": "134,234,345 ETH"
  },
  {
    "symbol": "BNB",
    "name": "Binance Coin",
    "price": "$312.45",
    "change_24h": "▼0.12%",
    "change_7d": "▲2.34%",
    "change_30d": "▼4.23%",
    "market_cap": "$85,345,345,245",
    "volume": "$11,345,345,345",
    "supply": "154,234,345 BNB"
  },
  {
    "symbol": "ADA",
    "name": "Cardano",
    "price": "$0.39",
    "change_24h": "▲0.98%",
    "change_7d": "▲3.67%",
    "change_30d": "▼6.43%",
    "market_cap": "$50,345,345,245",
    "volume": "$7,345,345,345",
    "supply": "25,234,345,345 ADA"
  },
  {
    "symbol": "XRP",
    "name": "Ripple",
    "price": "$0.52",
    "change_24h": "▼0.31%",
    "change_7d": "▲1.89%",
    "change_30d": "▲0.50%",
    "market_cap": "$27,345,345,245",
    "volume": "$6,345,345,345",
    "supply": "99,234,345,345 XRP"
  },
  {
    "symbol": "DOGE",
    "name": "Dogecoin",
    "price": "$0.07",
    "change_24h": "▲1.23%",
    "change_7d": "▲2.45%",
    "change_30d": "▼8.12%",
    "market_cap": "$9,345,345,245",
    "volume": "$3,345,345,345",
    "supply": "138,234,345,345 DOGE"
  },
  {
    "symbol": "DOT",
    "name": "Polkadot",
    "price": "$6.45",
    "change_24h": "▼0.45%",
    "change_7d": "▲3.12%",
    "change_30d": "▼7.98%",
    "market_cap": "$12,345,345,245",
    "volume": "$4,345,345,345",
    "supply": "112,234,345 DOT"
  },
  {
    "symbol": "MATIC",
    "name": "Polygon",
    "price": "$0.88",
    "change_24h": "▲1.10%",
    "change_7d": "▼0.65%",
    "change_30d": "▲3.45%",
    "market_cap": "$14,345,345,245",
    "volume": "$5,345,345,345",
    "supply": "10,234,345,345 MATIC"
  },
  {
    "symbol": "LTC",
    "name": "Litecoin",
    "price": "$85.32",
    "change_24h": "▲0.67%",
    "change_7d": "▲2.34%",
    "change_30d": "▼5.67%",
    "market_cap": "$20,345,345,245",
    "volume": "$3,345,345,345",
    "supply": "71,234,345 LTC"
  },
  {
    "symbol": "AVAX",
    "name": "Avalanche",
    "price": "$14.56",
    "change_24h": "▼0.78%",
    "change_7d": "▲4.23%",
    "change_30d": "▼6.43%",
    "market_cap": "$11,345,345,245",
    "volume": "$3,345,345,345",
    "supply": "34,234,345 AVAX"
  },
  {
    "symbol": "ALGO",
    "name": "Algorand",
    "price": "$0.23",
    "change_24h": "▲1.12%",
    "change_7d": "▼1.34%",
    "change_30d": "▲0.98%",
    "market_cap": "$7,345,345,245",
    "volume": "$2,345,345,345",
    "supply": "89,234,345 ALGO"
  },
  {
    "symbol": "VET",
    "name": "VeChain",
    "price": "$0.02",
    "change_24h": "▲0.78%",
    "change_7d": "▼0.45%",
    "change_30d": "▲2.34%",
    "market_cap": "$5,345,345,245",
    "volume": "$1,345,345,345",
    "supply": "65,234,345 VET"
  },
  {
    "symbol": "XLM",
    "name": "Stellar",
    "price": "$0.11",
    "change_24h": "▼0.89%",
    "change_7d": "▲2.34%",
    "change_30d": "▲0.50%",
    "market_cap": "$6,345,345,245",
    "volume": "$2,345,345,345",
    "supply": "50,234,345 XLM"
  },
  {
    "symbol": "FTM",
    "name": "Fantom",
    "price": "$0.45",
    "change_24h": "▲0.67%",
    "change_7d": "▲3.12%",
    "change_30d": "▼4.56%",
    "market_cap": "$4,345,345,245",
    "volume": "$1,345,345,345",
    "supply": "12,234,345 FTM"
  }
]




export const fee_management_data = {
  "send": [
    { "charge": "$15", "percentage": "0.5%", "status": "active", "date": "01-01-24 / 11:23 AM" },
    { "charge": "$15", "percentage": "0.5%", "status": "active", "date": "01-01-24 / 11:23 AM" },
    { "charge": "$15", "percentage": "0.5%", "status": "active", "date": "01-01-24 / 11:23 AM" },
    { "charge": "$15", "percentage": "0.5%", "status": "active", "date": "01-01-24 / 11:23 AM" },
    { "charge": "$15", "percentage": "0.5%", "status": "active", "date": "01-01-24 / 11:23 AM" }
  ],
  "buy": [
    { "charge": "$16", "percentage": "0.5%", "status": "active", "date": "01-01-24 / 11:23 AM" },
    { "charge": "$15", "percentage": "0.5%", "status": "inactive", "date": "01-01-24 / 11:23 AM" },
    { "charge": "$15", "percentage": "0.5%", "status": "active", "date": "01-01-24 / 11:23 AM" },
    { "charge": "$15", "percentage": "0.5%", "status": "inactive", "date": "01-01-24 / 11:23 AM" },
    { "charge": "$15", "percentage": "0.5%", "status": "active", "date": "01-01-24 / 11:23 AM" }
  ],
  "swap": [
    { "charge": "$17", "percentage": "0.5%", "status": "active", "date": "01-01-24 / 11:23 AM" },
    { "charge": "$15", "percentage": "0.5%", "status": "active", "date": "01-01-24 / 11:23 AM" },
    { "charge": "$15", "percentage": "0.5%", "status": "inactive", "date": "01-01-24 / 11:23 AM" },
    { "charge": "$15", "percentage": "0.5%", "status": "active", "date": "01-01-24 / 11:23 AM" },
    { "charge": "$15", "percentage": "0.5%", "status": "active", "date": "01-01-24 / 11:23 AM" }
  ],
  "withdraw": [
    { "charge": "$18", "percentage": "0.5%", "status": "active", "date": "01-01-24 / 11:23 AM" },
    { "charge": "$15", "percentage": "0.5%", "status": "inactive", "date": "01-01-24 / 11:23 AM" },
    { "charge": "$15", "percentage": "0.5%", "status": "inactive", "date": "01-01-24 / 11:23 AM" },
    { "charge": "$15", "percentage": "0.5%", "status": "inactive", "date": "01-01-24 / 11:23 AM" },
    { "charge": "$15", "percentage": "0.5%", "status": "active", "date": "01-01-24 / 11:23 AM" }
  ]
}