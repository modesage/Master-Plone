import PropTypes from 'prop-types';
import React from 'react';
import {
  Container as SemanticContainer,
  Header,
  Image,
  Label,
  Segment,
} from 'semantic-ui-react';
import { flattenToAppURL } from '@plone/volto/helpers';
import config from '@plone/volto/registry';

const color_mapping = {
  beginner: 'green',
  advanced: 'yellow',
  professional: 'purple',
};

const TalkView = ({ content }) => {
  const Container =
    config.getComponent({ name: 'Container' }).component || SemanticContainer;
  return (
    <Container id="view-wrapper talk-view">
      <h1 className="documentFirstHeading">
        <span className="type_of_talk">{content.type_of_talk.token}: </span>
        {content.title}
      </h1>
      {content.description && (
        <p className="documentDescription">{content.description}</p>
      )}
      {content.audience?.map((item) => {
        const color = color_mapping[item.token] || 'green';
        return (
          <Label key={item.token} color={color}>
            {item.token}
          </Label>
        );
      })}
      <div dangerouslySetInnerHTML={{ __html: content.details.data }} />
      <Segment clearing>
        {content.speaker && <Header dividing>{content.speaker}</Header>}
        {content.website ? (
          <p>
            <a href={content.website}>{content.company || content.website}</a>
          </p>
        ) : (
          <p>{content.company}</p>
        )}
        {content.email && (
          <p>
            Email: <a href={`mailto:${content.email}`}>{content.email}</a>
          </p>
        )}
        {content.twitter && (
          <p>
            X:{' '}
            <a href={`https://x.com/${content.twitter}`}>
              {content.twitter.startsWith('@')
                ? content.twitter
                : '@' + content.twitter}
            </a>
          </p>
        )}
        {content.github && (
          <p>
            Github:{' '}
            <a href={`https://github.com/${content.github}`}>
              {content.github}
            </a>
          </p>
        )}
        <Image
          src={flattenToAppURL(content.image?.scales?.preview?.download)}
          size="small"
          floated="right"
          alt={content.speaker}
          avatar
        />
        {content.speaker_biography && (
          <div
            dangerouslySetInnerHTML={{
              __html: content.speaker_biography.data,
            }}
          />
        )}
      </Segment>
    </Container>
  );
};

TalkView.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    type_of_talk: PropTypes.shape({
      token: PropTypes.string.isRequired,
    }).isRequired,
    audience: PropTypes.arrayOf(
      PropTypes.shape({
        token: PropTypes.string.isRequired,
      }),
    ),
    details: PropTypes.shape({
      data: PropTypes.string.isRequired,
    }).isRequired,
    speaker: PropTypes.string,
    website: PropTypes.string,
    company: PropTypes.string,
    email: PropTypes.string,
    twitter: PropTypes.string,
    github: PropTypes.string,
    image: PropTypes.shape({
      scales: PropTypes.shape({
        preview: PropTypes.shape({
          download: PropTypes.string,
        }),
      }),
    }),
    speaker_biography: PropTypes.shape({
      data: PropTypes.string,
    }),
  }).isRequired,
};

export default TalkView;
