import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const testUsers = [
    ['Zena Kelley', 'velvetround', '/user-images/image-zena.jpg'],
    ['Suzanne Chang', 'upbeat1811', '/user-images/image-suzanne.jpg'],
    ['Thomas Hood', 'brawnybrave', '/user-images/image-thomas.jpg'],
    ['Elijah Moss', 'hexagon.bestagon', '/user-images/image-elijah.jpg'],
    ['James Skinner', 'hummingbird1', '/user-images/image-james.jpg'],
    ['Anne Valentine', 'annev1990', '/user-images/image-anne.jpg'],
    ['Ryan Welles', 'voyager.344', '/user-images/image-ryan.jpg'],
    ['George Partridge', 'soccerviewer8', '/user-images/image-george.jpg'],
    ['Javier Pollard', 'warlikeduke', '/user-images/image-javier.jpg'],
    ['Roxanne Travis', 'peppersprime32', '/user-images/image-roxanne.jpg'],
    ['Victoria Mejia', 'arlen_the_marlin', '/user-images/image-victoria.jpg'],
    ['Jackson Barker', 'countryspirit', '/user-images/image-jackson.jpg'],
  ].map(([name, username, avatarUrl]) => ({
    name,
    username,
    avatarUrl,
    password: bcrypt.hashSync('secret', 10),
  }));

  const dummyUsers = Array(123)
    .fill(0)
    .map((_) => ({
      username: faker.internet.username().toLowerCase(),
      name: faker.person.fullName(),
      password: bcrypt.hashSync('secret', 10),
    }));

  const users = await prisma.user.createMany({
    data: [...testUsers, ...dummyUsers],
  });

  console.log({ users });
}

async function rawSql() {
  const categories = await prisma.$executeRaw`
    INSERT INTO "category" (name)
    VALUES
      ('Feature'),
      ('UI'),
      ('UX'),
      ('Bug'),
      ('Enhancement');
  `;

  const statuses = await prisma.$executeRaw`
    INSERT INTO "status" (name)
    VALUES
      ('Suggestion'),
      ('Planned'),
      ('In-Progress'),
      ('Live');
  `;

  const feedbackRequests = await prisma.$executeRaw`
    INSERT INTO "feedback_request" (title, description, category_id, status_id, user_id)
    VALUES
      ('Add tags for solutions', 'Easier to search for solutions based on a specific stack.', 5, 1, 1),
      ('Add a dark theme option', 'It would help people with light sensitivities and who prefer dark mode.', 1, 1, 1),
      ('Q&A within the challenge hubs', 'Challenge-specific Q&A would make for easy reference.', 1, 1, 8),
      ('Add image/video upload to feedback', 'Images and screencasts can enhance comments on solutions.', 5, 1, 9),
      ('Ability to follow others', 'Stay updated on comments and solutions other people post.', 1, 1, 11),
      ('Preview images not loading', 'Challenge preview images are missing when you apply a filter.', 4, 1, 11),
      ('More comprehensive reports', 'It would be great to see a more detailed breakdown of solutions.', 1, 2, 11),
      ('Learning paths', 'Sequenced projects for different goals to help people improve.', 1, 2, 8),
      ('One-click portfolio generation', 'Add ability to create professional looking portfolio from profile.', 1, 3, 7),
      ('Bookmark challenges', 'Be able to bookmark challenges to take later on.', 1, 3, 2),
      ('Animated solution screenshots', 'Screenshots of solutions with animations don’t display correctly.', 4, 3, 2),
      ('Add micro-interactions', 'Small animations at specific points can add delight.', 5, 4, 11);
  `;

  const comments = await prisma.$executeRaw`
    INSERT INTO "comment" (content, feedback_request_id, user_id, parent_comment_id, reply_to_user_id)
    VALUES
      ('Awesome idea! Trying to find framework-specific projects within the hubs can be tedious', 1, 2, NULL, NULL),
      ('Please use fun, color-coded labels to easily identify them at a glance', 1, 3, NULL, NULL),
      ('Also, please allow styles to be applied based on system preferences. I would love to be able to browse Frontend Mentor in the evening after my device’s dark mode turns on without the bright background it currently has.', 2, 4, NULL, NULL),
      ('Second this! I do a lot of late night coding and reading. Adding a dark theme can be great for preventing eye strain and the headaches that result. It’s also quite a trend with modern apps and  apparently saves battery life.', 2, 5, NULL, NULL),
      ('Much easier to get answers from devs who can relate, since they''ve either finished the challenge themselves or are in the middle of it.', 3, 8, NULL, NULL),
      ('Right now, there is no ability to add images while giving feedback which isn''t ideal because I have to use another app to show what I mean', 4, 9, NULL, NULL),
      ('Yes I''d like to see this as well. Sometimes I want to add a short video or gif to explain the site''s behavior..', 4, 10, NULL, NULL),
      ('I also want to be notified when devs I follow submit projects on FEM. Is in-app notification also in the pipeline?', 5, 11, NULL, NULL),
      ('I''ve been saving the profile URLs of a few people and I check what they’ve been doing from time to time. Being able to follow them solves that', 5, 12, NULL, NULL),
      ('This would be awesome! It would be so helpful to see an overview of my code in a way that makes it easy to spot where things could be improved.', 7, 11, NULL, NULL),
      ('Yeah, this would be really good. I''d love to see deeper insights into my code!', 7, 12, NULL, NULL),
      ('Having a path through the challenges that I could follow would be brilliant! Sometimes I''m not sure which challenge would be the best next step to take. So this would help me navigate through them!', 8, 8, NULL, NULL),
      ('I haven''t built a portfolio site yet, so this would be really helpful. Might it also be possible to choose layout and colour themes?!', 9, 7, NULL, NULL),
      ('This would be great! At the moment, I''m just starting challenges in order to save them. But this means the My Challenges section is overflowing with projects and is hard to manage. Being able to bookmark challenges would be really helpful.', 10, 2, NULL, NULL),
      ('I''d love to see this! It always makes me so happy to see little details like these on websites.', 12, 11, NULL, NULL),
      ('While waiting for dark mode, there are browser extensions that will also do the job. Search for ''dark theme'' followed by your browser. There might be a need to turn off the extension for sites with naturally black backgrounds though.', 2, 6, 4, 5),
      ('Good point! Using any kind of style extension is great and can be highly customizable, like the ability to change contrast and brightness. I''d prefer not to use one of such extensions, however, for security and privacy reasons.', 2, 7, 4, 6),
      ('Bumping this. It would be good to have a tab with a feed of people I follow so it''s easy to see what challenges they’ve done lately. I learn a lot by reading good developers'' code.', 5, 1, 8, 11),
      ('Me too! I''d also love to see celebrations at specific points as well. It would help people take a moment to celebrate their achievements!', 12, 2, 15, 11);
  `;

  console.log({ categories, statuses, feedbackRequests, comments });
}

async function addInitialUpvotes() {
  const upvoteCounts = [112, 99, 65, 51, 42, 3, 123, 28, 62, 31, 9, 71];

  const upvoteRecords = [];
  for (let i = 0; i < upvoteCounts.length; i++) {
    upvoteRecords.push(
      ...Array(upvoteCounts[i])
        .fill(0)
        .map((_, j) => ({ userId: j + 13, feedbackRequestId: i + 1 }))
    );
  }

  const upvotes = await prisma.upvote.createMany({ data: upvoteRecords });

  console.log({ upvotes });
}

main()
  .then(rawSql)
  .then(addInitialUpvotes)
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
