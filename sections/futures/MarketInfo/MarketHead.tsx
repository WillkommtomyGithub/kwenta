import Head from 'next/head';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { selectMarketAssetRate } from 'state/futures/selectors';
import { useAppSelector } from 'state/hooks';

import { DEFAULT_CRYPTO_DECIMALS } from 'constants/defaults';
import useSelectedPriceCurrency from 'hooks/useSelectedPriceCurrency';
import { currentMarketState } from 'store/futures';
import { formatCurrency } from 'utils/formatters/number';
import { getDisplayAsset, isDecimalFour } from 'utils/futures';

const MarketHead: React.FC = () => {
	const { t } = useTranslation();
	const { selectedPriceCurrency } = useSelectedPriceCurrency();
	const baseCurrencyKey = useRecoilValue(currentMarketState);
	const marketAssetRate = useAppSelector(selectMarketAssetRate);
	const marketName = getDisplayAsset(baseCurrencyKey);

	return (
		<Head>
			<title>
				{marketAssetRate
					? t('futures.market.page-title-rate', {
							marketName,
							rate: formatCurrency(selectedPriceCurrency.name, marketAssetRate, {
								currencyKey: selectedPriceCurrency.name,
								minDecimals:
									marketName != null && isDecimalFour(marketName)
										? DEFAULT_CRYPTO_DECIMALS
										: undefined,
							}),
					  })
					: t('futures.market.page-title')}
			</title>
		</Head>
	);
};

export default MarketHead;
