function ProfileNavigation() {
  return (
    <nav className="profile-page-nav" aria-label="Within practitioner pages">
      <a className="profile-page-brand" href="#top" aria-label="Return to Within home">
        <span aria-hidden="true">✺</span>
        Within
      </a>
      <div className="profile-page-links">
        <a href="#top">Home</a>
        <a href="#/about-me">About me</a>
        <a href="#/qualifications">Qualifications + experience</a>
        <a className="profile-page-cta" href="#waitlist">Join the waitlist</a>
      </div>
    </nav>
  );
}

function ProfileFooter() {
  return (
    <footer className="profile-page-footer">
      <div>
        <p className="eyebrow">Within Counselling</p>
        <h2>A gentler way inward.</h2>
        <p>Neuroaffirming counselling for women, parents and families.</p>
      </div>
      <div className="profile-page-footer-links">
        <a href="#top">Home</a>
        <a href="#/about-me">About me</a>
        <a href="#/qualifications">Qualifications</a>
        <a href="mailto:hello@withinmind.com.au">Email Within</a>
      </div>
    </footer>
  );
}

const livedExperience = [
  'parenting a child with additional needs and navigating the learning curve that comes with it',
  'neurodivergence within family life and the reality of trying to make ordinary systems fit different brains',
  'long seasons of disrupted sleep, overwhelm and trying to keep family life moving when capacity is low',
  'health difficulties and the practical impact they can have on identity, relationships, parenting and daily functioning',
  'separation, co-parenting and the emotional and logistical complexity of raising a child across changing family structures',
  'navigating the NDIS, education and support systems, including advocacy when a child needs more understanding or adjustment',
];

const practiceThreads = [
  {
    title: 'Justice-sector experience',
    text: 'More than a decade across Community Corrections and Youth Justice shaped a way of working that looks beyond a person’s hardest behaviour or most difficult chapter. It strengthened my understanding of people within systems, the importance of clear boundaries and the value of curiosity, accountability and dignity existing together.',
  },
  {
    title: 'Family support',
    text: 'Three years in a Young Parents Support Program added a strong attachment-informed and trauma-informed family lens. The work centred relationships, parenting, early connection, family stress and helping young parents navigate services while building confidence in their own capacity.',
  },
  {
    title: 'Counselling',
    text: 'Formal counselling study brings these experiences into a dedicated therapeutic framework — with attention to ethics, reflective practice, relational safety, communication and approaches that support meaningful change without shame.',
  },
  {
    title: 'Lived experience',
    text: 'Personal experience of parenting, neurodivergence, additional needs, health challenges, separation, co-parenting and advocacy brings another kind of understanding: how exhausting it can be to keep explaining, organising, researching and fighting for support while also trying to live an ordinary family life.',
  },
];

export function AboutPage() {
  return (
    <main className="profile-page">
      <header className="profile-page-header">
        <ProfileNavigation />
        <div className="profile-hero-grid">
          <div className="profile-hero-copy">
            <p className="eyebrow">About the person behind Within</p>
            <h1>Professional knowledge. Real-world experience. Very little interest in pretending life is tidy.</h1>
            <p className="profile-hero-lead">
              Within grew from years of working alongside people navigating complex systems, relationships, parenting,
              behaviour, change and overwhelm — and from knowing personally that support can be technically correct and
              still completely miss what real life feels like.
            </p>
            <div className="profile-hero-actions">
              <a className="primary-action" href="#/qualifications">View qualifications + experience</a>
              <a className="secondary-action" href="#approach">Explore the Within approach</a>
            </div>
          </div>
          <aside className="profile-hero-note">
            <span className="profile-sprig" aria-hidden="true">⌇</span>
            <p className="small-label">What matters here</p>
            <blockquote>
              You are more than the behaviour, diagnosis, difficult season, parenting moment or system that has reduced
              you to a box.
            </blockquote>
            <p>
              My approach is warm, practical and curious about what is happening underneath the surface — while still
              helping make the next step feel possible.
            </p>
          </aside>
        </div>
      </header>

      <section className="profile-section profile-intro-section">
        <div className="profile-section-heading">
          <p className="eyebrow">The path to Within</p>
          <h2>My work has always been about people in context.</h2>
        </div>
        <div className="profile-long-copy">
          <p>
            Before counselling became the formal next chapter, I spent more than ten years working across Community
            Corrections and Youth Justice. That background may look different from a traditional counselling pathway,
            but it has deeply shaped how I understand people.
          </p>
          <p>
            Justice settings repeatedly bring you back to the reality that behaviour never exists in a vacuum. People
            live inside families, communities, histories, systems, relationships, pressures and protective strategies.
            Working in that environment shaped a practice style that can hold complexity without immediately reducing a
            person to a label — and that values dignity, accountability, boundaries and genuine relationship at the same
            time.
          </p>
          <p>
            I later moved into family support, spending three years working with young parents in a program strongly
            informed by attachment and trauma-informed practice. That work brought the focus even closer to early
            relationships, parenting under pressure, connection, repair and the practical realities that can make even
            good advice difficult to use.
          </p>
        </div>
      </section>

      <section className="profile-section profile-thread-section">
        <div className="profile-section-heading compact-heading">
          <p className="eyebrow">The threads I bring together</p>
          <h2>Not one lens. A fuller picture.</h2>
        </div>
        <div className="profile-thread-grid">
          {practiceThreads.map((thread) => (
            <article className="profile-thread-card" key={thread.title}>
              <span aria-hidden="true">✦</span>
              <h3>{thread.title}</h3>
              <p>{thread.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="profile-section lived-section">
        <div className="lived-copy">
          <p className="eyebrow">Lived experience, with boundaries</p>
          <h2>I also know what some of these systems feel like from the other side.</h2>
          <p>
            Professional training matters. So does knowing the difference between professional knowledge and personal
            experience. My lived experience is not a qualification, and I will never assume that my story is the same as
            yours. It does, however, shape the kind of space I want Within to be.
          </p>
          <p>
            I understand the peculiar exhaustion of trying to parent, work, research, advocate, attend appointments,
            explain the same story again, complete another form and somehow still remember what is for dinner.
          </p>
        </div>
        <div className="lived-list" aria-label="Areas of lived experience informing Within">
          {livedExperience.map((item) => (
            <div className="lived-list-item" key={item}>
              <span aria-hidden="true">↳</span>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="profile-section profile-boundary-card">
        <p className="eyebrow">What that means for you</p>
        <h2>Less explaining why the obvious solution is not always realistic.</h2>
        <p>
          Within is being built around the idea that good support should make room for capacity, sensory needs,
          neurodivergence, family dynamics, finances, systems, fatigue and the fact that people are usually doing the
          best they can with more going on than anyone can see from the outside.
        </p>
        <p>
          Lived experience may help me understand parts of the landscape, but your experience remains yours. Counselling
          is not about fitting your story into mine; it is about understanding yours well enough to work out what helps.
        </p>
      </section>

      <ProfileFooter />
    </main>
  );
}

const qualifications = [
  {
    title: 'Bachelor of Criminology and Criminal Justice',
    detail: 'Tertiary study in crime, justice, behaviour, systems and the social contexts surrounding people and communities.',
  },
  {
    title: 'Undergraduate study in Psychological Science',
    detail: 'Completed as part of the original Bachelor of Psychological Science / Bachelor of Criminology and Criminal Justice dual-degree program. This is described as undergraduate study rather than a psychology major unless the formal academic record confirms a named major or specialisation.',
  },
  {
    title: 'Diploma of Counselling',
    detail: 'Currently completing. The website will be updated to reflect completion only once the qualification has formally been awarded.',
  },
  {
    title: 'Certificate IV in Correctional Practice',
    detail: 'Vocational training supporting professional practice within correctional environments.',
  },
  {
    title: 'Certificate III in Business (IT)',
    detail: 'Foundational business and information-technology training.',
  },
];

const professionalLearning = [
  'Circle of Security',
  'Tuning in to Kids',
  'Bringing Up Great Kids',
  'Sanctuary Framework',
  'ongoing counselling education and reflective practice',
  'ongoing professional development in neuroaffirming, creative, experiential and nature-informed approaches',
];

const experience = [
  {
    number: '10+ years',
    title: 'Community Corrections + Youth Justice',
    text: 'Experience working within complex human-service and justice systems, informing a counselling style that considers behaviour in context and recognises the impact of systems, relationships and life circumstances.',
  },
  {
    number: '3 years',
    title: 'Young Parents Family Support',
    text: 'Family Support Worker experience within a Young Parents Support Program, with a strong attachment-informed and trauma-informed foundation and practical support for parents navigating family life and service systems.',
  },
  {
    number: 'Ongoing',
    title: 'Counselling + professional development',
    text: 'Continued study and skill-building across counselling, neuroaffirming practice, parenting support, creative and experiential methods, and nature-informed approaches.',
  },
];

const counsellingRelevance = [
  {
    title: 'Seeing behaviour in context',
    text: 'Years in justice and family-support settings reinforce that behaviour is only one part of a much larger story. Within looks at what may sit underneath: stress, relationships, development, environment, sensory load, learned protection and unmet needs.',
  },
  {
    title: 'Working alongside complex systems',
    text: 'Experience across justice and family services brings familiarity with the reality that people often need to navigate multiple services at once. That perspective informs practical counselling, advocacy preparation and support that acknowledges system fatigue.',
  },
  {
    title: 'Warmth with clear boundaries',
    text: 'Relational safety does not require vagueness. The Within style aims to be compassionate, direct and respectful while keeping expectations, roles and professional boundaries clear.',
  },
  {
    title: 'Practical change, not perfect plans',
    text: 'Across parenting, justice and family-support work, change has to survive real life. Counselling therefore focuses on understanding alongside realistic tools, language, experiments and next steps.',
  },
];

export function QualificationsPage() {
  return (
    <main className="profile-page qualifications-page">
      <header className="profile-page-header qualifications-header">
        <ProfileNavigation />
        <div className="qualification-hero">
          <p className="eyebrow">Qualifications + experience</p>
          <h1>A counselling practice built on formal study, more than a decade of human-services experience and continued learning.</h1>
          <p className="profile-hero-lead">
            Within brings together counselling education, criminology and justice study, correctional practice, family
            support, attachment-informed work, trauma-informed practice and ongoing development in neuroaffirming,
            creative and nature-informed approaches.
          </p>
        </div>
      </header>

      <section className="profile-section qualification-list-section">
        <div className="profile-section-heading">
          <p className="eyebrow">Formal qualifications + study</p>
          <h2>The foundations.</h2>
        </div>
        <div className="qualification-list">
          {qualifications.map((qualification) => (
            <article className="qualification-row" key={qualification.title}>
              <span aria-hidden="true">✦</span>
              <div>
                <h3>{qualification.title}</h3>
                <p>{qualification.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="profile-section experience-section">
        <div className="profile-section-heading compact-heading">
          <p className="eyebrow">Professional experience</p>
          <h2>Experience that informs the room.</h2>
        </div>
        <div className="experience-grid">
          {experience.map((item) => (
            <article className="experience-card" key={item.title}>
              <strong>{item.number}</strong>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="profile-section relevance-section">
        <div className="profile-section-heading">
          <p className="eyebrow">Why the justice background is relevant</p>
          <h2>Counselling did not begin the first time I entered a counselling classroom.</h2>
          <p>
            Community Corrections and Youth Justice are not counselling qualifications, and Within does not present them
            as such. They are, however, substantial professional experience working in areas where human behaviour,
            relationships, systems and change are impossible to separate from one another.
          </p>
        </div>
        <div className="relevance-grid">
          {counsellingRelevance.map((item) => (
            <article className="relevance-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="profile-section learning-section">
        <div>
          <p className="eyebrow">Additional learning</p>
          <h2>Practice keeps developing.</h2>
          <p>
            Within is being developed as an evidence-informed practice with ongoing professional learning. Completed
            programs are listed separately from areas currently being explored so the website does not imply credentials
            that have not yet been earned.
          </p>
        </div>
        <div className="learning-cloud">
          {professionalLearning.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <section className="profile-section scope-note">
        <p className="eyebrow">Clear scope, clear language</p>
        <h2>What Within does — and does not — claim.</h2>
        <p>
          Within uses counselling, family-support experience and additional professional development to inform a warm,
          neuroaffirming, trauma-informed and practical approach. Creative, sensory, experiential and nature-informed
          methods may be incorporated within counselling where appropriate.
        </p>
        <p>
          The practitioner is not represented as a psychologist or art therapist. Qualifications, memberships and
          specialist credentials will only be described as completed once they have formally been awarded or verified.
        </p>
      </section>

      <ProfileFooter />
    </main>
  );
}
