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
    date: "Jun 2025",
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
    date: "Jul 2025",
    description: [
      "Launched in 2018, TRON is an EVM-compatible Layer-1 protocol focused on financial inclusion and serving as a global liquidity rail. It uses a bandwidth and energy system for largely fee-free transactions, and its DPoS consensus, managed by 27 Super Representatives, enables high transaction throughput (up to 2000 TPS).",
      "Since its mainnet launch, TRON has processed over 10B transactions, with over 70% being direct peer-to-peer transfers, and facilitated over $15T in stablecoin transactions. As of July 2025, the network has over 320M accounts and adds 2.3M wallets daily, making it a top chain for new wallet creation. TRON accounts for over 30% of global stablecoin market capitalisation, highlighting its role in stablecoin settlements, especially for lower-value transfers (around 60% of its USDT transactions are under $1,000).",
    ],
    url: "https://www.coindesk.com/research/tron-network-primer",
  },
  {
    slug: "goplus-security",
    title: "GoPlus Security",
    date: "Nov 2025",
    description: [
      "Launched in 2020, GoPlus Security is a decentralised Web3 security infrastructure designed to provide real-time protection against on-chain threats and enhance transaction integrity across the blockchain ecosystem. Positioned as a security layer for Web3, GoPlus operates across more than 40 blockchains, including Ethereum, BNB Chain, Solana and Optimism. Its modular architecture — comprising the Security Data Layer, Security Compute Layer, and SecWare Protocol — enables trustless, data-driven intelligence that identifies and mitigates risks across networks and users.",
      "GoPlus's product suite includes the GoPlus App, a one-stop security hub for users; the SafeToken Protocol, which standardises secure token issuance and liquidity management; and GoPlus Intelligence, a collection of AI-powered APIs and SDKs that deliver security data to developers, wallets, and institutions. These products are integrated across the Web3 ecosystem, including with platforms such as Binance, MetaMask, and Trust Wallet, collectively helping protect billions in on-chain assets.",
      "In 2025, GoPlus introduced its native token, $GPS, which powers payments, staking, computation, and governance within the network. The token underpins the ecosystem's incentive model, enabling access to security services, rewarding contributors, and aligning stakeholders through staking and slashing mechanisms. As of October 2025, GoPlus has generated $4.7M in total revenue across its three product lines, led by the GoPlus App.",
      "Looking ahead, GoPlus aims to strengthen its position as a decentralised and AI-driven security layer for Web3 by advancing sequencer-level risk control mechanisms, expanding cross-chain integrations, and launching its Governance Portal to enable community-led decision-making. Through continued development of its AI-enabled security tools and compliance with frameworks such as the EU's MiCAR, GoPlus seeks to contribute to a safer and more transparent blockchain ecosystem.",
    ],
    url: "https://www.coindesk.com/research/protocol-research-goplus-security",
  },
  {
    slug: "kucoin-record-market-share-2025",
    title: "KuCoin Hits Record Market Share as 2025 Volumes Outpace Crypto Market",
    date: "Dec 2025",
    description: [
      "KuCoin cemented its spot among top 10 centralised exchanges by volume. Driven by renewed digital asset interest following last November's U.S. political shifts, cumulative trading volumes in spot and perpetual markets crossed $1.25 trillion, averaging $114B per month. The spot market alone averaged $46.1B, a fourfold rise since 2023.",
      "This exceptional growth wasn't a fleeting surge but a sustained phenomenon, characterised by a distinct \"stair-step\" progression in trading volumes, comprising notable upticks followed by periods of robust stability at higher levels. Such a pattern suggests a steadily expanding user engagement, diverging from the volatile boom-and-bust cycles often seen in crypto markets. This consistency points to platform maturation with a growing sticky user base.",
      "Activity remained remarkably resilient during the historically quiet periods. Defying the \"Summer lull,\" volumes nearly doubled between June and August, led by a relatively busier altcoin market. Volume also picked up during market swoons in November and the multi-week period from February to early April.",
      "This resilience is consistent with KuCoin's strategic focus on investor trust, notably through its $2 billion \"Trust Project\" initiated earlier this year, which focuses on enhancing transparency, security, and advancing compliance.",
      "The volume profile showcases a diverse array of trader preferences. While Layer 1s and memecoins remained the bread and butter, bringing the most volume, traders also gravitated to tokens linked to artificial intelligence and specific DEX categories. This shows a diverse trading community that marches its own beat, although much of the focus has been on established altcoins rather than novel sectors like Decentralised Science.",
      "Order book depth for top altcoins has held steady in recent weeks even as the overall market liquidity conditions have deteriorated since the Oct. 10 crash. The resilience is consistent with the stability observed on Binance and OKX and stands out compared to sharp declines in 1% depth on major exchanges such as Coinbase, Bitstamp and Bybit.",
      "The exchange has consistently surpassed the global average for new monthly listings, strengthening its appeal as an altcoin venue. This aggressive approach of listing new coins, often at double the pace of the industry average, positions KuCoin at the forefront of price discovery for new markets and forming early opportunities for the next wave of digital assets.",
    ],
    url: "https://www.coindesk.com/research/kucoin-hits-record-market-share-as-2025-volumes-outpace-crypto-market",
  },
  {
    slug: "goplus-security-h2-2025",
    title: "GoPlus Security H2 2025: Executing Through Market Stress as Web3 Losses Hit $4B",
    date: "Feb 2026",
    description: [
      "In the second half of 2025, GoPlus Security continued to reinforce its position as a foundational infrastructure layer within the Web3 security stack. Rather than signalling a strategic shift, H2 was defined by roadmap execution, incremental product expansion, and deeper ecosystem integration across wallets, blockchains, and developer platforms. While $GPS declined 77.3% during H2 amid broader market stress and scheduled supply unlocks, ecosystem fundamentals continued to strengthen.",
      "GoPlus Intelligence remained the primary interface between the network and downstream users, delivering real-time security services across token analysis, address risk assessment, phishing detection, and transaction monitoring. During H2, the API suite expanded with the launch of the Transaction Simulation and Address Scan APIs, extending GoPlus's coverage to pre-signature transaction behaviour and comprehensive address-level risk profiling. While overall API usage declined modestly compared to H1, daily request volumes remained elevated, reflecting sustained demand for composable, real-time security primitives embedded directly into Web3 workflows.",
      "The SafeToken Protocol emerged as a key growth engine during the period. Total value locked in the SafeToken Locker increased 21.6% to $40.2M in H2, reaching an all-time high of $66M in October. Growth was supported by the introduction of more flexible vesting and price-based unlocking mechanisms, as well as expanded deployment across additional chains. Adoption by chains, launchpads, and token infrastructure providers reinforced SafeToken's role as a core tool for secure token issuance, vesting, and distribution.",
      "At the application layer, traction for the GoPlus App softened materially, with H2 revenue declining significantly compared to the prior half, though it remains the protocol's largest historical revenue contributor. In contrast, infrastructure participation remained stable and continued to scale. SecHub deployments surpassed 70,000 instances by year-end, GoPlus AVS operators held steady at 36, and total ETH restaked across the AVS reached 1.1M ETH, strengthening the economic security underpinning the network.",
      "Product development accelerated through H2 with the launch of the GoPlus B2B platform, expanded support for emerging transaction standards such as EIP-7702 and x402, and the rollout of a next-generation security engine. GoPlus also advanced AI-native security initiatives, including the private beta of the DeepScan engine and the launch of AgentGuard for AI agents, alongside progress on verifiable security and compliance-focused tools.",
      "Looking ahead, as Web3 security losses reached $4.0B in 2025, demand for protocol-embedded, real-time security infrastructure is accelerating. Positioned at the intersection of chain-level security, AI-native risk, and aligned ecosystem incentives, GoPlus is well placed to play a central role in the next phase of decentralised security adoption.",
    ],
    url: "https://www.coindesk.com/research/goplus-security-h2-2025",
  },
  {
    slug: "digital-assets-etp-landscape",
    title: "Digital Assets ETP Landscape: Past, Present and Future",
    date: "Feb 2026",
    description: [
      "Digital asset ETPs have entered a new phase of institutional adoption, surpassing $250B at their peak as regulatory clarity accelerates product expansion and index-based innovation.",
      "Digital asset ETP assets surged past $250B at their peak following U.S. spot Bitcoin ETF approvals, with $184B in AUM at year-end 2025 and the U.S. accounting for nearly 80% of global assets.",
      "The market remains concentrated, with Bitcoin-based products representing 78.2% of total AUM ($144B), while Ethereum-based products account for $26.5B.",
      "More than 125 digital asset ETP filings are pending, signalling a shift toward broader asset coverage and multi-asset, index-based products.",
    ],
    url: "https://www.coindesk.com/research/digital-assets-etp-landscape-past-present-and-future",
  },
  {
    slug: "stablecoin-landscape-north-america",
    title: "The Definitive Stablecoin Landscape Series: North America",
    date: "Mar 2026",
    description: [
      "As stablecoins evolve into core financial infrastructure, North America leads. This report maps the regulation, market shifts, and players driving adoption.",
      "Stablecoins are into their third phase of evolution — the institutionalisation era — transitioning from crypto-native tools into core financial infrastructure. What began as a mechanism for trading and liquidity has evolved into a foundational layer for payments, cross-border settlement, and on-chain capital markets, driven by regulatory clarity and growing participation from traditional financial institutions.",
      "Within this shift, North America has emerged as the most important region for stablecoin development, leading in regulatory frameworks, financial infrastructure, custody solutions, and institutional distribution. A defining trend of this phase is the migration toward regulated, onshore stablecoins. As adoption expands into corporate treasury and payments, institutions are prioritising transparency and compliance.",
      "This shift is evident in market structure, with USDT's dominance declining from 71.1% to 59.9%, while alternatives including USDC, RLUSD and PYUSD have steadily gained share, reflecting a broader reallocation toward compliant, institution-ready issuers.",
      "RLUSD's strategic advantage lies in its integration with Ripple's broader financial ecosystem, which provides immediate access to established payment corridors, financial institutions, and enterprise clients. This allows RLUSD to anchor adoption in real transactional demand, rather than relying solely on exchange-driven liquidity. Early traction, including surpassing $1B in market capitalisation within its first year, underscores the growing demand for compliant, institution-ready stablecoins.",
    ],
    url: "https://www.coindesk.com/research/the-definitive-stablecoin-landscape-series-north-america",
  },
];
