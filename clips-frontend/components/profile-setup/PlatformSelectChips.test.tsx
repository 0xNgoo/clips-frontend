import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PlatformSelectChips } from './PlatformSelectChips';
import React from 'react';

describe('PlatformSelectChips', () => {
  it('renders all platform chips', () => {
    render(<PlatformSelectChips />);
    expect(screen.getByText('TikTok')).toBeInTheDocument();
    expect(screen.getByText('Instagram')).toBeInTheDocument();
    expect(screen.getByText('YT Shorts')).toBeInTheDocument();
  });

  it('selects a chip when clicked', () => {
    const handleChange = vi.fn();
    render(<PlatformSelectChips onChange={handleChange} />);
    
    const tiktokChip = screen.getByText('TikTok');
    fireEvent.click(tiktokChip);
    
    expect(handleChange).toHaveBeenCalledWith(['TikTok']);
    expect(tiktokChip).toHaveAttribute('aria-pressed', 'true');
  });

  it('toggles a chip unselected when clicked again', () => {
    const handleChange = vi.fn();
    render(<PlatformSelectChips selectedPlatforms={['TikTok']} onChange={handleChange} />);
    
    const tiktokChip = screen.getByText('TikTok');
    // Initially selected
    expect(tiktokChip).toHaveAttribute('aria-pressed', 'true');
    
    // Click to deselect
    fireEvent.click(tiktokChip);
    expect(handleChange).toHaveBeenCalledWith([]);
    expect(tiktokChip).toHaveAttribute('aria-pressed', 'false');
  });

  it('allows multiple platforms to be selected', () => {
    const handleChange = vi.fn();
    render(<PlatformSelectChips selectedPlatforms={['TikTok']} onChange={handleChange} />);
    
    const instaChip = screen.getByText('Instagram');
    fireEvent.click(instaChip);
    
    expect(handleChange).toHaveBeenCalledWith(['TikTok', 'Instagram']);
  });

  it('displays error message when provided', () => {
    const errorMessage = 'Please select at least one target platform';
    render(<PlatformSelectChips error={errorMessage} />);
    
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
