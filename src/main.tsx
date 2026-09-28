import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AboutPage, QualificationsPage } from './ProfilePages';
import { NatureApproachPage } from './NatureApproachPage';
import './App.css';
import './polish.css';
import './brand-assets.css';
import './profile-pages.css';

type SiteRoute = 'home' | 'about' | 'qualifications' | 'nature';

function getRoute(): SiteRoute {
  const hash = window.location.hash.toLowerCase();

  if (hash === '#/about-me') return 'about';
  if (hash === '#/qualifications') return 'qualifications';
  if (hash === '#/nature-creative') return 'nature';
  return 'home';
}

function ProfileAccessBar() {
  return (
    <div className="profile-access-bar" aria-label="Learn about the practitioner and Within approach">
      <strong>The person behind Within</strong>
      <a href="#/about-me">About me</a>
      <a href="#/qualifications">Qualifications + experience</a>
      <a href="#/nature-creative">Nature + creative approach</a>
    </div>
  );
}

function SiteRoot() {
  const [route, setRoute] = useState<SiteRoute>(() => getRoute());

  useEffect(() => {
    const handleHashChange = () => setRoute(getRoute());
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (route === 'about') {
      document.title = 'About | Within Counselling';
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }

    if (route === 'qualifications') {
      document.title = 'Qualifications & Experience | Within Counselling';
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }

    if (route === 'nature') {
      document.title = 'Nature + Creative Counselling | Within';
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }

    document.title = 'Within Counselling';
    const target = window.location.hash.replace('#', '');

    if (target && !target.startsWith('/')) {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          document.getElementById(target)?.scrollIntoView({ block: 'start' });
        });
      });
    }
  }, [route]);

  if (route === 'about') return <AboutPage />;
  if (route === 'qualifications') return <QualificationsPage />;
  if (route === 'nature') return <NatureApproachPage />;

  return (
    <>
      <ProfileAccessBar />
      <App />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SiteRoot />
  </React.StrictMode>,
);
