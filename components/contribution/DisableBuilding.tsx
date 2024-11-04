'use client';

import { createModal } from '@codegouvfr/react-dsfr/Modal';
import { Actions, AppDispatch, RootState } from '@/stores/map/store';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '@codegouvfr/react-dsfr/Alert';
import { SelectedBuilding } from '@/stores/map/slice';
import { useRNBFetch } from '@/utils/use-rnb-fetch';

const modal = createModal({
  id: 'disable-building-modal',
  isOpenedByDefault: false,
});

export function DisableBuilding() {
  const selectedItem = useSelector((state: RootState) => state.selectedItem)!;
  const { fetch } = useRNBFetch();
  const dispatch: AppDispatch = useDispatch();

  const disableBuilding = async () => {
    const building = selectedItem as SelectedBuilding;
    const url = `${process.env.NEXT_PUBLIC_API_BASE}/buildings/${building.rnb_id}/`;

    await fetch(url, {
      body: JSON.stringify({
        comment: 'Désactivation via le site',
        is_active: false,
      }),
      method: 'PATCH',
    });

    // Reload map buildings
    dispatch(Actions.map.reloadBuildings());

    // Unselect the building
    dispatch(Actions.map.unselectItem());
  };

  return (
    selectedItem._type === 'building' && (
      <>
        <button className="action" onClick={() => modal.open()}>
          Désactiver
        </button>

        <modal.Component
          title={`Désactiver le bâtiment ${selectedItem.rnb_id}`}
          concealingBackdrop={false}
          size="large"
          buttons={[
            {
              doClosesModal: true,
              children: 'Annuler',
            },
            {
              onClick: disableBuilding,
              doClosesModal: true,
              children: 'Désactiver',
            },
          ]}
        >
          <p>
            Ce bâtiment ne correspond pas à la{' '}
            <a href="/definition" target="_blank">
              définition du RNB
            </a>{' '}
            ou il existe en double.
          </p>

          <Alert
            description={`L'action que vous vous apprêtez à effectuer ne supprime pas définitivement le bâtiment. Il est seulement désactivé et son accès restera possible afin de garder un RNB ID pérenne.`}
            severity="info"
            small
          />
        </modal.Component>
      </>
    )
  );
}
