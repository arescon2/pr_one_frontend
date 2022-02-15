import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Empty } from 'antd'

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

  return !loading ? <Empty /> : <Renderer params={params} loading={loading} />
};

export default Page;