import {FC} from 'react'
import {useIntl} from 'react-intl'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import {PageTitle} from '../../../_metronic/layout/core'
import { useEffect } from 'react'
import {getclinics} from './_requests'
import {
  ListsWidget2,
  ListsWidget3,
  ListsWidget4,
  ListsWidget6,
  TablesWidget5,
  TablesWidget10,
  MixedWidget8,
  CardsWidget7,
  CardsWidget17,
  CardsWidget20,
  ListsWidget26,
  EngageWidget10,
} from '../../../_metronic/partials/widgets'

// const DashboardPage: FC = () => (
//   <>
//     useEffect(() => {
//     // If you have the ID or any parameter needed for getclincsis, replace 'yourParameter' with the actual parameter value
//     getclincsis('yourParameter');
//   }, []);
//   </>
// )
const DashboardPage: FC = () => {
  useEffect(() => {
    // If you have the ID or any parameter needed for getclincsis, replace 'yourParameter' with the actual parameter value
    getclinics();
  }, []);

  return (
    <>
      {/* Your DashboardPage JSX content */}
    </>
  );
}

const DashboardWrapper: FC = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
      <DashboardPage />
    </>
  )
}

export {DashboardWrapper}
