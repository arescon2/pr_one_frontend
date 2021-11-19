import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  H5, Intent, Label,
  NonIdealState, Slider, Spinner, SpinnerSize,
  Switch, Text
} from "@blueprintjs/core";

import { Col, Row } from 'react-grid-system';

import './style.scss';
import Generator from '../../features/generator';

const Page = () => {
  let params = useParams();
  
  let { data, setData } = useState({});
  let { loading, setLoading } = useState(true);

  useEffect(() => {
    console.log(params.pagename);
    // get page config
  }, [params.pagename])

  let b = <NonIdealState
    className='spinner-page'
    icon={<Spinner size={SpinnerSize.STANDARD} />}
    description="Подождите, идет загрузка данных"
  />

  console.log(loading)

  if(!loading) {
    b = <Generator
      config={[]}
      data={data}
      updData={setData}
    />
  }

  return b;
}

export default Page;