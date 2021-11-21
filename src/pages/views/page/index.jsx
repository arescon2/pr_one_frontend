import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  NonIdealState, Slider, Spinner, SpinnerSize
} from "@blueprintjs/core";

import Renderer from './renderer';

function Page() {
  const params = useParams();

  const [ location, setLocation ] = useState({});
  const [ loading, setLoading ] = useState(true);

  const rerender = () => {
    setLoading(true);
    setLocation(params.pagename)
    setLoading(true);
  };

  useEffect(() => {
    if(params.pagename !== location) {
      rerender();
    };
    // get page config
  }, [params.pagename]);

  return !loading ? <NonIdealState
    className='spinner-page'
    icon={<Spinner size={SpinnerSize.STANDARD} />}
    description="Подождите, идет загрузка данных"
  /> : <Renderer params={params} loading={loading} />
};

export default Page;