import React, { useEffect } from 'react';
import { Box, Button, Grid, Typography } from '@material-ui/core';

import { TextInput } from '../../components/TextInput';
import { CurrencyInput } from '../../components/CurrencyInput';
import { LabeledRadio } from '../../components/LabeledRadio';
import { LabeledRadioGroup } from '../../components/LabeledRadioGroup';
import { useField } from '../../hooks/useField';
import { usePointToAddress } from '../../hooks/usePointToAddress';

import { StoneMapMarker, StoneMapMarkerType } from './data';

export type NewMapMarkerFormProps = {
  atPoint: google.maps.LatLngLiteral;
  onCancel(): void;
  onSubmit(lead: Omit<StoneMapMarker, 'id'>): void;
};

export function NewMapMarkerForm(props: NewMapMarkerFormProps) {
  const [leadType, bindLeadType, leadTypeField] = useField<StoneMapMarkerType>('QUALIFICATION');
  const [shopType, bindShopType, shopTypeField] = useField('');
  const [shopName, bindShopName, shopNameField] = useField('');
  const [address, bindAddress, addressField] = useField('');
  const [merchantName, bindMerchantName, merchantNameField] = useField('');
  const [averageCardRevenue, bindRevenue, revenueField] = useField(0);

  const isFormValid =
    leadType && shopType && shopName && address && merchantName && averageCardRevenue;

  const [fetchedAddress, addressLoading] = usePointToAddress(props.atPoint);

  useEffect(() => {
    if (fetchedAddress) {
      addressField.set(fetchedAddress);
    }
  }, [addressField, fetchedAddress]);

  const handleCancel = () => {
    props.onCancel();
    resetFields();
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!isFormValid) return;

    props.onSubmit({
      type: leadType,
      position: props.atPoint,
      favorite: false,
      info: {
        address,
        shopName,
        shopType,
        merchantName,
        averageCardRevenue,
      },
    });

    resetFields();
  };

  const resetFields = () => {
    [
      leadTypeField,
      shopTypeField,
      shopNameField,
      addressField,
      merchantNameField,
      revenueField,
    ].forEach(($0) => $0.reset());
  };

  return (
    <Box px={2} py={3}>
      <form onSubmit={handleSubmit}>
        <Typography variant="h2">Novo Lead</Typography>
        <Box mt={2} width="100%">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <LabeledRadioGroup label="Tipo de Lead" {...bindLeadType}>
                <LabeledRadio label="Qualificação" value="QUALIFICATION" />
                <LabeledRadio label="Proposta" value="PROPOSAL" />
                <LabeledRadio label="Cliente" value="CLIENT" />
              </LabeledRadioGroup>
            </Grid>
            <Grid item xs={12}>
              <TextInput label="Tipo de Loja" id="lead-shop-type" {...bindShopType} />
            </Grid>
            <Grid item xs={12}>
              <TextInput label="Nome da Loja" id="lead-shop-name" {...bindShopName} />
            </Grid>
            <Grid item xs={12}>
              <TextInput
                multiline
                label="Endereço"
                id="lead-shop-address"
                disabled={addressLoading}
                {...bindAddress}
              />
            </Grid>
            <Grid item xs={6}>
              <TextInput label="Nome para Contato" id="lead-merchant-name" {...bindMerchantName} />
            </Grid>
            <Grid item xs={6}>
              <CurrencyInput label="Média Mensal" id="lead-average-card-revenue" {...bindRevenue} />
            </Grid>
          </Grid>
        </Box>
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Box mr={2}>
            <Button variant="text" onClick={handleCancel}>
              Cancelar
            </Button>
          </Box>
          <Button type="submit" color="primary">
            Salvar
          </Button>
        </Box>
      </form>
    </Box>
  );
}
