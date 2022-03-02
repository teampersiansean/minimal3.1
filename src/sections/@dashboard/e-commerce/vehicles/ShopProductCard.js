import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
// next
import NextLink from 'next/link';
// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
// components
import Label from '../../../../components/Label';
import Image from '../../../../components/Image';
import { ColorPreview } from '../../../../components/color-utils';

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  const {
    car_make_name,
    car_vin,
    id,
    name,
    car_imgsrcurl_1,
    cover,
    price,
    colors,
    status,
    priceSale,
  } = product;

  // const linkTo = `${PATH_DASHBOARD.eCommerce.root}/vehicle/${paramCase(
  //   car_make_name
  // )}/${paramCase(car_vin)}`;
  const linkTo = `${PATH_DASHBOARD.eCommerce.root}/vehicle-details/${id}`;

  return (
    <Card>
      <Box sx={{ position: 'relative' }}>
        {status && (
          <Label
            variant="filled"
            // color={(status === 'sale' && 'error') || 'info'}
            sx={{
              top: 16,
              right: 16,
              zIndex: 9,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {status}
          </Label>
        )}
        <Image alt={name} src={car_imgsrcurl_1} ratio="1/1" />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <NextLink href={linkTo} passHref>
          <Link color="inherit">
            <Typography variant="subtitle2" noWrap>
              {car_make_name}
            </Typography>
          </Link>
        </NextLink>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          {/* <ColorPreview colors={colors} /> */}

          <Stack direction="row" spacing={0.5}>
            {priceSale && (
              <Typography
                component="span"
                sx={{ color: 'text.disabled', textDecoration: 'line-through' }}
              >
                {fCurrency(priceSale)}
              </Typography>
            )}

            <Typography variant="subtitle1">{fCurrency(price)}</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
