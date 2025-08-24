import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { InformationCard } from '@/components/information-card/information-card';
import { mockUser } from '@/__mocks__/mock-data';

describe('Card component', () => {
  it('Should be rendered', () => {
    render(<InformationCard data={mockUser} isLast={false} />);
    expect(screen.getByText(new RegExp(mockUser.name))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(mockUser.email))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(mockUser.gender))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(mockUser.country))).toBeInTheDocument();
    expect(screen.getByText(': on')).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(mockUser.picture_base64))
    ).toBeInTheDocument();
    expect(screen.queryByText('picture')).not.toBeInTheDocument();
  });

  it('Should render "information is lost", if not having data', () => {
    render(<InformationCard data={undefined} isLast={true} />);
  });
});
