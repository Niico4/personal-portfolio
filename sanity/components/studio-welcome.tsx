'use client';

import type { ReactNode } from 'react';
import { Box, Card, Flex, Grid, Heading, Stack, Text } from '@sanity/ui';
import {
  IconBriefcase,
  IconRocket,
  IconSchool,
  IconUserCircle,
} from '@tabler/icons-react';

const quickLinks = [
  {
    title: 'Profile',
    description: 'Main intro, CV, contact links and skills.',
    href: '/studio/structure/profile',
    icon: <IconUserCircle size={22} />,
  },
  {
    title: 'Projects',
    description: 'Project cards, detail content, videos and links.',
    href: '/studio/structure/project',
    icon: <IconRocket size={22} />,
  },
  {
    title: 'Work Experience',
    description: 'Experience groups, positions, highlights and tools.',
    href: '/studio/structure/workExperience',
    icon: <IconBriefcase size={22} />,
  },
  {
    title: 'Education',
    description: 'Programs, institutions, credentials and dates.',
    href: '/studio/structure/education',
    icon: <IconSchool size={22} />,
  },
];

export default function StudioWelcome() {
  return (
    <Box
      padding={5}
      style={{
        minHeight: '100%',
        color: '#f8fafc',
        background:
          'radial-gradient(circle at 15% 10%, rgb(93, 184, 246, 0.28), transparent 30%), radial-gradient(circle at 85% 20%, rgba(255, 255, 255, 0.09), transparent 24%), linear-gradient(135deg, #050507 0%, #0b0f13 45%, #09090b 100%)',
      }}
    >
      <Stack space={5}>
        <Grid columns={[1, 2]} gap={4}>
          {quickLinks.map((item) => (
            <QuickLinkCard key={item.title} {...item} />
          ))}
        </Grid>
      </Stack>
    </Box>
  );
}

type QuickLinkCardProps = {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
};

function QuickLinkCard({ title, description, href, icon }: QuickLinkCardProps) {
  return (
    <a href={href} style={{ color: 'inherit', textDecoration: 'none' }}>
      <Card
        padding={4}
        radius={4}
        shadow={1}
        style={{
          height: '100%',
          background: 'rgba(255,255,255,0.075)',
          border: '1px solid rgba(255,255,255,0.11)',
          color: '#f8fafc',
          transition: 'transform 160ms ease, border-color 160ms ease',
        }}
      >
        <Stack space={3}>
          <Flex align="center" justify="space-between">
            <Box>{icon}</Box>
            <Text size={1} style={{ color: '#5DB8F6' }}>
              Open
            </Text>
          </Flex>

          <Stack space={2}>
            <Heading size={2}>{title}</Heading>
            <Text size={1} style={{ color: '#cbd5e1' }}>
              {description}
            </Text>
          </Stack>
        </Stack>
      </Card>
    </a>
  );
}
