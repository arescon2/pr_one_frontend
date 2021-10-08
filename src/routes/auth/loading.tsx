import React from 'react'
import { ProgressBar } from 'react-line-progress-bar';

import { useStore } from 'nanostores/react';
import { update } from 'nanostores';

import { StoreGlobal } from '../../stores/global';

const LoadingPage = () => {
  const duration = 'ltr',
    styles = `
      .inside {text-align: right;}
      .progress-bar__parallel-visible-line {pointer-events: none;}
      .progress-bar__wrapper {text-align: center;}
      .progress-bar__line, .progress-bar__parallel-visible-line {transition: transform 0.5s 0s ease;}
      .progress-bar_full-filled {color: green;}
    `;

  let store = useStore(StoreGlobal);
  let show = store.loading;
  let progress = store.loading_duration;

  if(progress >= 100 ) update(StoreGlobal, values => {
    values.loading = false;
    values.loading_duration = 0;
    return values;
  });

  if(show) {
    return <div className='loading-page-block'>
      <style>{styles}</style>
      <ProgressBar
        progress={progress}
        maxProgress={100}
        duration={duration}
      />
    </div>
  } else {
    return null
  }
}

export default LoadingPage;