export type Report = {
  month: string;
  year: number;
  url: string;
  insight: string;
  kind: "web" | "pdf" | "medium";
};

export type SeriesKey = "exchange-review" | "stablecoins-report";

export const seriesMeta: Record<
  SeriesKey,
  { label: string; description: string; note?: string }
> = {
  "exchange-review": {
    label: "Exchange Review",
    description:
      "Monthly analysis of centralized exchange trading volumes and market share.",
  },
"stablecoins-report": {
    label: "Stablecoins Report",
    description:
      "Monthly analysis of stablecoin market capitalisation, volumes, and regulatory developments.",
  },
};

export const exchangeReview: Report[] = [
  { month: "Feb", year: 2022, url: "https://www.cryptocompare.com/media/39838277/cryptocompare_exchange_review_2022_02_nwm-1.pdf", insight: "Spot volumes fell 12.9% to $1.57tn and derivatives 15.9% to $2.64tn amid rising risk-averse sentiment.", kind: "pdf" },
  { month: "Mar", year: 2022, url: "https://www.cryptocompare.com/media/40061772/cryptocompare_exchange_review_2022_03_vf-2.pdf", insight: "Spot volumes rose 10.5% to $1.62tn; Binance captured over 30% of spot volume ($490bn, +15.7%).", kind: "pdf" },
  { month: "May", year: 2022, url: "https://www.cryptocompare.com/media/40411383/exchange_review_may_final.pdf", insight: "Spot volumes surged 13.6% to $1.97tn amid TerraUSD-collapse volatility; FTX overtook OKX and Coinbase.", kind: "pdf" },
  { month: "Jun", year: 2022, url: "https://www.cryptocompare.com/media/40484726/exchange_review_june_vf-2.pdf", insight: "Combined volumes fell 15.2% to $4.16tn, the lowest since Jan 2021, amid Terra/lending-platform contagion.", kind: "pdf" },
  { month: "Jul", year: 2022, url: "https://www.cryptocompare.com/media/40485073/exchange_review_july_vf-1.pdf", insight: "Spot volumes hit their lowest point since Dec 2020; AAX became the 2nd-largest exchange with $57.2bn.", kind: "pdf" },
  { month: "Aug", year: 2022, url: "https://www.cryptocompare.com/media/43687860/exchange_review_august_vf.pdf", insight: "Spot trading jumped 36.8% to $1.91tn; derivatives share fell to a yearly low of 62.4%.", kind: "pdf" },
  { month: "Sep", year: 2022, url: "https://medium.com/tales-from-the-crypto/exchange-review-september-2022-9bb1cfeda415", insight: "Top-tier exchanges hit 93.6% of spot volume, highest since Nov 2017; Binance reached $541bn (+23.5%).", kind: "medium" },
  { month: "Oct", year: 2022, url: "https://www.cryptocompare.com/media/43881489/exchange_review_oct_vf.pdf", insight: "Spot volume fell 25.4% to $929bn, lowest since Oct 2020; Binance held 42% share as Coinbase overtook FTX.", kind: "pdf" },
  { month: "Nov", year: 2022, url: "https://data.coindesk.com/reports/exchange-review-november-2022", insight: "Spot/derivatives volumes rose 13.7%/10.1% amid FTX-collapse panic selling; Binance hit a 52.9% share.", kind: "web" },
  { month: "Dec", year: 2022, url: "https://data.coindesk.com/reports/exchange-review-december-2022", insight: "Spot volumes collapsed 48.4% to $544bn, the lowest level since 2019.", kind: "web" },
  { month: "Jan", year: 2023, url: "https://data.coindesk.com/reports/exchange-review-january-2023", insight: "BTC/ETH rose 39.9%/32.7%; spot volumes surged 57.9% to $860bn.", kind: "web" },
  { month: "Feb", year: 2023, url: "https://data.coindesk.com/reports/exchange-review-february-2023", insight: "Binance's spot market share reached an all-time high of 61.8%.", kind: "web" },
  { month: "Mar", year: 2023, url: "https://data.coindesk.com/reports/exchange-review-march-2023", insight: "Derivatives volume rose 32.6% to $2.77tn, an all-time-high 72.7% share of the market.", kind: "web" },
  { month: "Apr", year: 2023, url: "https://data.coindesk.com/reports/exchange-review-april-2023", insight: "Combined volume fell 27.9% to $2.77tn — the first monthly decline of 2023.", kind: "web" },
  { month: "May", year: 2023, url: "https://data.coindesk.com/reports/exchange-review-may-2023", insight: "Combined volume fell 15.7% to $2.41tn, a second consecutive monthly decline.", kind: "web" },
  { month: "Jun", year: 2023, url: "https://data.coindesk.com/reports/exchange-review-june-2023", insight: "Combined volume rose 14.2% to $2.71tn, the first increase since March.", kind: "web" },
  { month: "Jul", year: 2023, url: "https://data.coindesk.com/reports/exchange-review-july-2023", insight: "Combined volume fell 12.0% to $2.36tn, the lowest so far in 2023.", kind: "web" },
  { month: "Aug", year: 2023, url: "https://data.coindesk.com/reports/exchange-review-august-2023", insight: "Combined volume fell 11.5% to $2.09tn, a new low for the year.", kind: "web" },
  { month: "Sep", year: 2023, url: "https://data.coindesk.com/reports/exchange-review-september", insight: "Combined volume fell 20.3% to $1.67tn, the lowest level since Dec 2022.", kind: "web" },
  { month: "Oct", year: 2023, url: "https://data.coindesk.com/reports/exchange-review-october-2023", insight: "Combined volume rose 53.0% to $2.57tn, the strongest growth since Jan 2021.", kind: "web" },
  { month: "Nov", year: 2023, url: "https://data.coindesk.com/reports/exchange-review-november", insight: "Combined volume rose 40.7% to $3.61tn, the highest level since March 2023.", kind: "web" },
  { month: "Dec", year: 2023, url: "https://data.coindesk.com/reports/exchange-review-december-2023", insight: "Combined volume rose 28.4% to $4.68tn, the highest level since June 2022.", kind: "web" },
  { month: "Jan", year: 2024, url: "https://data.coindesk.com/reports/exchange-review-january-2024", insight: "Spot volumes rose 4.45% to $1.40tn (4th straight rise) though combined volume dipped.", kind: "web" },
  { month: "Feb", year: 2024, url: "https://data.coindesk.com/reports/exchange-review-february-2024", insight: "Combined volume rose 2.28% to $4.73tn as Bitcoin neared new all-time highs.", kind: "web" },
  { month: "Mar", year: 2024, url: "https://data.coindesk.com/reports/exchange-review-march-2024", insight: "Combined volume rose 92.9% to a new all-time high of $9.12tn as Bitcoin hit record highs.", kind: "web" },
  { month: "Apr", year: 2024, url: "https://data.coindesk.com/reports/exchange-review-april-2024", insight: "Combined volume fell 43.8% to $6.58tn on macro headwinds and negative Bitcoin ETF flows.", kind: "web" },
  { month: "May", year: 2024, url: "https://data.coindesk.com/reports/exchange-review-may-2024", insight: "Combined volume fell 20.1% to $5.27tn ahead of spot Ethereum ETF approval volatility.", kind: "web" },
  { month: "Jun", year: 2024, url: "https://data.coindesk.com/reports/exchange-review-june-2024", insight: "Combined volume fell 21.8% to $4.22tn, continuing the decline from March's $9.05tn peak.", kind: "web" },
  { month: "Jul", year: 2024, url: "https://data.coindesk.com/reports/exchange-review-july-2024", insight: "Combined volume rose 19.0% to $4.94tn, the first increase in four months.", kind: "web" },
  { month: "Aug", year: 2024, url: "https://data.coindesk.com/reports/exchange-review-august-2024", insight: "Combined volume rose 5.38% to $5.22tn.", kind: "web" },
  { month: "Sep", year: 2024, url: "https://data.coindesk.com/reports/exchange-review-september-2024", insight: "Combined volume dropped 17.0% to $4.34tn, the lowest level since June.", kind: "web" },
  { month: "Oct", year: 2024, url: "https://data.coindesk.com/reports/exchange-review-october-2024", insight: "Combined volume rose 19.0% to $5.19tn, the fifth-highest month of the year.", kind: "web" },
  { month: "Nov", year: 2024, url: "https://data.coindesk.com/reports/exchange-review-november-2024", insight: "Combined volume surged 101% to $10.4tn — the first time CEX trading topped $10tn in a month.", kind: "web" },
  { month: "Dec", year: 2024, url: "https://data.coindesk.com/reports/exchange-review-december-2024", insight: "Combined volume rose 7.58% to $11.3tn, a new all-time high.", kind: "web" },
  { month: "Jan", year: 2025, url: "https://data.coindesk.com/reports/exchange-review", insight: "Combined volume fell 20.2% to $9.03tn.", kind: "web" },
  { month: "Feb", year: 2025, url: "https://data.coindesk.com/reports/exchange-review-february", insight: "Combined volume fell 20.6% to $7.20tn, the lowest level since October.", kind: "web" },
  { month: "Mar", year: 2025, url: "https://data.coindesk.com/reports/exchange-review-march", insight: "Combined volume fell 6.24% to $6.79tn, the lowest level since October 2024.", kind: "web" },
  { month: "Apr", year: 2025, url: "https://data.coindesk.com/reports/exchange-review-april-2025", insight: "Combined volume dipped 0.41% to $6.79tn, the weakest total since October 2024.", kind: "web" },
  { month: "May", year: 2025, url: "https://data.coindesk.com/reports/exchange-review-may", insight: "Bitcoin reached new all-time highs, driving a significant surge in trading activity.", kind: "web" },
  { month: "Jun", year: 2025, url: "https://data.coindesk.com/reports/exchange-review-june-2025", insight: "Volume declined 22.8% to $6.48tn; derivatives share hit its highest since Sept 2023 (77.8%).", kind: "web" },
  { month: "Jul", year: 2025, url: "https://data.coindesk.com/reports/exchange-review-july-2025", insight: "Spot volumes rose 53.7% to $2.2T, highest since Feb; derivatives hit a new yearly high.", kind: "web" },
  { month: "Aug", year: 2025, url: "https://data.coindesk.com/reports/exchange-review-august-2025", insight: "Combined volume rose 7.58% to $9.72T, a new yearly high.", kind: "web" },
  { month: "Sep", year: 2025, url: "https://data.coindesk.com/reports/exchange-review-september-2025", insight: "Combined volume fell 17.5% to $8.12T, the first pullback in three months.", kind: "web" },
  { month: "Oct", year: 2025, url: "https://data.coindesk.com/reports/exchange-review-october-2025", insight: "Spot volume +26.0% to $2.70T; derivatives +25.8% to $7.56T, the highest since Dec 2024.", kind: "web" },
  { month: "Nov", year: 2025, url: "https://data.coindesk.com/reports/exchange-review-november-2025", insight: "Combined volume plunged 24.7% to $7.74T, the largest monthly decline since April 2024.", kind: "web" },
  { month: "Dec", year: 2025, url: "https://data.coindesk.com/reports/exchange-review-december-2025", insight: "Combined volume fell 26.4% to $5.79T, the lowest level since October 2024.", kind: "web" },
  { month: "Jan", year: 2026, url: "https://data.coindesk.com/reports/exchange-review-january-2026", insight: "Combined volume climbed 2.43% to $5.95T, rebounding after three straight declines.", kind: "web" },
  { month: "Feb", year: 2026, url: "https://data.coindesk.com/reports/exchange-review-february-2026", insight: "Combined volume declined 2.41% to $5.61T, the lowest level since October 2024.", kind: "web" },
  { month: "Mar", year: 2026, url: "https://data.coindesk.com/reports/exchange-review-march-2026", insight: "Combined volume declined 6.53% to $5.26T; derivatives made up 76.5% of activity.", kind: "web" },
  { month: "Apr", year: 2026, url: "https://data.coindesk.com/reports/exchange-review-april-2026", insight: "Combined volume fell 11.7% to $4.61T, the lowest level since September 2024.", kind: "web" },
  { month: "May", year: 2026, url: "https://data.coindesk.com/reports/exchange-review-may-2026", insight: "Combined volume fell 3.45% to $4.41T, the lowest level since September 2024.", kind: "web" },
  { month: "Jun", year: 2026, url: "https://data.coindesk.com/reports/exchange-review-june-2026", insight: "Combined volume rose 13.0% to $4.99T, the first monthly increase in five months.", kind: "web" },
  { month: "Jul", year: 2026, url: "https://data.coindesk.com/reports/exchange-review-july-2026", insight: "Combined volume fell nearly 24% to $3.76T, the lowest level since November 2023.", kind: "web" },
];


export const stablecoinsReport: Report[] = [
  { month: "Jan", year: 2023, url: "https://data.coindesk.com/reports/stablecoins-report-january-2023", insight: "Market cap peaked at $188bn on Apr 2, 2022; report covers trends by collateral type and pegged asset.", kind: "web" },
  { month: "Feb", year: 2023, url: "https://data.coindesk.com/reports/stablecoins-report-february-2023", insight: "Market cap hit its lowest level since Sept 2021, -0.68% to $136bn — an 11th straight month of decline.", kind: "web" },
  { month: "Mar", year: 2023, url: "https://data.coindesk.com/reports/stablecoins-report-march-2023", insight: "Market cap fell 1.34% to $133bn, lowest since Sept 2021; trading volume rebounded to $51.9bn.", kind: "web" },
  { month: "Apr", year: 2023, url: "https://data.coindesk.com/reports/stablecoins-cbdcs-report-april-2023", insight: "Stablecoin trading volume grew 13.6% to $775bn amid multiple depegging events.", kind: "web" },
  { month: "Jun", year: 2023, url: "https://data.coindesk.com/reports/stablecoin-cbdcs-report-june-2023", insight: "Stablecoin trading volumes fell 10.0% to $414bn, the lowest since Dec 2022.", kind: "web" },
  { month: "Jul", year: 2023, url: "https://data.coindesk.com/reports/stablecoins-cbdcs-report-july-2023", insight: "USDT hit a new all-time-high market cap of $83.8bn, roughly two-thirds of the sector.", kind: "web" },
  { month: "Aug", year: 2023, url: "https://data.coindesk.com/reports/stablecoins-cbdcs-report-august-2023", insight: "Market cap fell to $124bn, the lowest since Aug 2021 — a 17th straight month of decline.", kind: "web" },
  { month: "Sep", year: 2023, url: "https://data.coindesk.com/reports/stablecoins-cbdcs-report-september-2023", insight: "Market cap held at $124bn — an 18th straight month of decline.", kind: "web" },
  { month: "Oct", year: 2023, url: "https://data.coindesk.com/reports/stablecoins-cbdcs-report-october-2023", insight: "Market cap fell 0.14% to $124bn — a 19th straight month trending down.", kind: "web" },
  { month: "Dec", year: 2023, url: "https://data.coindesk.com/reports/stablecoins-cbdcs-report-december-2023", insight: "Market cap rose 0.9% to $129bn; November added $4.25bn in supply, the largest monthly rise since Feb 2022.", kind: "web" },
  { month: "Jan", year: 2024, url: "https://data.coindesk.com/reports/stablecoins-cbdcs-report-january-2024", insight: "Market cap rose 2.45% to $134bn, highest since Feb 2023, after US spot Bitcoin ETF approvals.", kind: "web" },
  { month: "Feb", year: 2024, url: "https://data.coindesk.com/reports/stablecoins-cbdcs-report-february-2024", insight: "January trading volume hit a record $1.04tn; USDT held 75.3% share of the top-10 stablecoins.", kind: "web" },
  { month: "Mar", year: 2024, url: "https://data.coindesk.com/reports/stablecoins-cbdcs-report-march-2024", insight: "Market cap rose 4.24% to $147bn — a 6th straight monthly rise, highest since Sept 2022.", kind: "web" },
  { month: "Apr", year: 2024, url: "https://data.coindesk.com/reports/stablecoins-cbdcs-report-april-2024", insight: "Market cap rose 4.76% to $158bn — a 7th straight rise, highest since May 2022.", kind: "web" },
  { month: "May", year: 2024, url: "https://data.coindesk.com/reports/stablecoins-cbdcs-report-may-2024", insight: "Market cap rose 0.63% to $161bn — an 8th straight rise, highest since April 2022.", kind: "web" },
  { month: "Jun", year: 2024, url: "https://data.coindesk.com/reports/stablecoins-cbdcs-report-june-2024", insight: "Market cap rose 0.53% to $161bn — nine months of growth, highest since April 2022.", kind: "web" },
  { month: "Jul", year: 2024, url: "https://data.coindesk.com/reports/stablecoins-cbdcs-report-july-2024", insight: "Market cap rose 2.11% to $164bn — a 10th straight increase.", kind: "web" },
  { month: "Aug", year: 2024, url: "https://data.coindesk.com/reports/stablecoins-cbdcs-report-august-2024", insight: "Market cap rose 2.89% to $169bn — an 11th straight monthly increase.", kind: "web" },
  { month: "Sep", year: 2024, url: "https://data.coindesk.com/reports/stablecoins-cbdcs-report-september-2024", insight: "Market cap rose 1.50% to $172bn — a 12th straight increase.", kind: "web" },
  { month: "Oct", year: 2024, url: "https://data.coindesk.com/reports/stablecoins-cbdcs-report-october-2024", insight: "Market cap rose 0.05% to $173bn — a 13th straight monthly rise; USDT held 69.6% share.", kind: "web" },
  { month: "Nov", year: 2024, url: "https://data.coindesk.com/reports/stablecoins-cbdcs-report-november-2024", insight: "Market cap hit $190bn — a 14th straight increase, surpassing the April 2022 peak.", kind: "web" },
  { month: "Dec", year: 2024, url: "https://data.coindesk.com/reports/stablecoins-cbdcs-report-december-2024", insight: "Market cap topped $200bn for the first time, rising 5.51% to $203bn.", kind: "web" },
  { month: "Jan", year: 2025, url: "https://data.coindesk.com/reports/stablecoins-cbdcs-report", insight: "Market cap hit $215bn — a 16th straight increase; USDT reached an all-time high of $140bn.", kind: "web" },
  { month: "Feb", year: 2025, url: "https://data.coindesk.com/reports/stablecoins-cbdcs-report-february", insight: "Market cap rose 4.02% to $226bn — a 17th straight monthly increase.", kind: "web" },
  { month: "Mar", year: 2025, url: "https://data.coindesk.com/reports/stablecoins-cbdcs-report-march", insight: "Market cap rose 3.62% to $231bn — an 18th straight increase.", kind: "web" },
  { month: "Apr", year: 2025, url: "https://data.coindesk.com/reports/stablecoins-cbdcs-report-2-april", insight: "Comprehensive update on market cap, volumes, peg deviations and regulatory developments.", kind: "web" },
  { month: "May", year: 2025, url: "https://data.coindesk.com/reports/stablecoins-cbdcs-report-may-2025", insight: "Market cap hit a new all-time high, +2.27% to $246bn; USDT topped $150bn for the first time.", kind: "web" },
  { month: "Jun", year: 2025, url: "https://data.coindesk.com/reports/stablecoins-cbdcs-report-june-2025", insight: "Market cap climbed to $251bn on record growth; active stablecoin count nearly doubled YoY post-GENIUS Act.", kind: "web" },
  { month: "Jul", year: 2025, url: "https://data.coindesk.com/reports/stablecoins-cbdcs-report-july-2025", insight: "Market cap reached a new all-time high, +4.87% to $261bn.", kind: "web" },
  { month: "Aug", year: 2025, url: "https://data.coindesk.com/reports/stablecoins-cbdc-august", insight: "Market cap hit a record $278bn.", kind: "web" },
  { month: "Sep", year: 2025, url: "https://data.coindesk.com/reports/stablecoins-cbdcs-report-september-2025", insight: "Market cap reached $293bn after 24 months of continuous growth; Tether's dominance is eroding.", kind: "web" },
  { month: "Oct", year: 2025, url: "https://data.coindesk.com/reports/stablecoins-cbdcs-report-october-2025", insight: "Market cap hit a new all-time high, +3.64% to $308bn.", kind: "web" },
  { month: "Nov", year: 2025, url: "https://data.coindesk.com/reports/stablecoins-cbdcs-report-november", insight: "Market cap fell to $303bn — the first decline in over two years, ending 26 months of growth.", kind: "web" },
  { month: "Dec", year: 2025, url: "https://data.coindesk.com/reports/stablecoins-cbdcs-report---december-2025", insight: "Market resumed growth after November's dip, +1.25% to $310bn.", kind: "web" },
  { month: "Jan", year: 2026, url: "https://data.coindesk.com/reports/stablecoins-tokenized-assets-report-january-2026", insight: "Market expanded for a 2nd straight month, +0.14% to $308bn; USDT posted its first decline in 29 months.", kind: "web" },
  { month: "Feb", year: 2026, url: "https://data.coindesk.com/reports/stablecoins-tokenized-assets-report-february-2026", insight: "Market rose 0.98% to $309bn.", kind: "web" },
  { month: "Mar", year: 2026, url: "https://data.coindesk.com/reports/stablecoins-tokenized-assets-report-march-2026", insight: "Market hit a new peak of $317bn; Sky Protocol's USDS surged to $8.38bn.", kind: "web" },
  { month: "Apr", year: 2026, url: "https://data.coindesk.com/reports/stablecoins-tokenized-assets-report-april-2026", insight: "Market hit a new all-time high, +1.63% to $321bn, driven largely by Tether growth.", kind: "web" },
  { month: "Jun", year: 2026, url: "https://data.coindesk.com/reports/stablecoins-tokenized-assets-report-june-2026", insight: "Tokenized-equities on-chain volume hit a new all-time high, +145% to $3.86bn.", kind: "web" },
  { month: "Jul", year: 2026, url: "https://data.coindesk.com/reports/stablecoins-tokenized-assets-report-july-2026", insight: "Tokenized-asset market cap surged 11.5% to $32.1bn, the highest month-end level on-chain.", kind: "web" },
  { month: "Aug", year: 2026, url: "https://data.coindesk.com/reports/stablecoins-tokenized-assets-report-august-2026", insight: "Stablecoin sector market cap rose 1.19% to $311bn — the first monthly increase in three months.", kind: "web" },
];

export function makeSlug(series: SeriesKey, month: string, year: number) {
  return `${series}-${month.toLowerCase()}-${year}`;
}

export function allReports() {
  return [
    ...exchangeReview.map((r) => ({
      ...r,
      series: "exchange-review" as SeriesKey,
    })),
    ...stablecoinsReport.map((r) => ({
      ...r,
      series: "stablecoins-report" as SeriesKey,
    })),
  ];
}

// ─── Protocol Research ────────────────────────────────────────────────────────

export type ProtocolReport = {
  slug: string;
  title: string;
  date: string;
  description: string[];
  url: string;
};

export const protocolResearch: ProtocolReport[] = [
  {
    slug: "bahamut-blockchain-validator-incentives",
    title: "Bahamut Blockchain: A New Playbook for Validator Incentives",
    date: "2023",
    description: [
      "Bahamut is an EVM-compatible Layer-1 blockchain that launched in May 2023, introducing the industry's first Proof of Stake and Activity (PoSA) consensus mechanism. Unlike traditional Proof of Stake models that reward validators solely for token staking, PoSA creates a dual-incentive system that rewards participants not only for staking tokens but for deploying smart contracts that drive actual usage.",
      "This activity-weighted approach aligns validator economics with actual network utility, incentivising validators to build and deploy smart contracts that drive meaningful user engagement rather than simply maximising stake.",
      "This report provides institutional-grade due diligence on Bahamut's validator design, tokenomics, technical architecture, and ecosystem adoption metrics. Commissioned by Bahamut and produced by CoinDesk Research, it offers a neutral assessment of the protocol's strategic positioning within the competitive Layer-1 landscape, targeting institutional allocators, developers, and market participants evaluating next-generation blockchain infrastructure.",
    ],
    url: "https://www.coindesk.com/research/bahamut-protocol-reseach",
  },
  {
    slug: "tron-network-primer",
    title: "TRON Network",
    date: "2025",
    description: [
      "Launched in 2018, TRON is an EVM-compatible Layer-1 protocol focused on financial inclusion and serving as a global liquidity rail. It uses a bandwidth and energy system for largely fee-free transactions, and its DPoS consensus, managed by 27 Super Representatives, enables high transaction throughput (up to 2000 TPS).",
      "Since its mainnet launch, TRON has processed over 10B transactions, with over 70% being direct peer-to-peer transfers, and facilitated over $15T in stablecoin transactions. As of July 2025, the network has over 320M accounts and adds 2.3M wallets daily, making it a top chain for new wallet creation. TRON accounts for over 30% of global stablecoin market capitalisation, highlighting its role in stablecoin settlements, especially for lower-value transfers (around 60% of its USDT transactions are under $1,000).",
    ],
    url: "https://www.coindesk.com/research/tron-network-primer",
  },
];
