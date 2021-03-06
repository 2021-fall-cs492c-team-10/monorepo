import { providers } from '@team-10/lib';
import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import Dialog from '../components/alert/Dialog';
import LoginButton from '../components/buttons/LoginButton';
import loadingState from '../recoil/loading';
import meState from '../recoil/me';
import appHistory from '../utils/history';

const ProfileConnect: React.FC = () => {
  const location = useLocation();
  const history = useHistory();

  const meInfo = useRecoilValue(meState.info);
  const setLoading = useSetRecoilState(loadingState.atom);

  const myProviders = meInfo?.ssoAccounts?.map(({ provider }) => provider) ?? [];

  return (
    <Dialog
      visible={!!meInfo && location.pathname === '/profile/connect'}
      onClose={() => appHistory.goBack(history)}
    >
      <div className="flex flex-col gap-6">
        {
          providers.map((provider) => (!myProviders.includes(provider) ? (
            <LoginButton
              key={provider}
              provider={provider}
              onClick={() => {
                setLoading(true);
                appHistory.goBack(history);
                window.location.href = `/api/auth/${provider}?redirect_uri=/profile`;
              }}
            />
          ) : null))
        }
      </div>
    </Dialog>
  );
};

export default ProfileConnect;
