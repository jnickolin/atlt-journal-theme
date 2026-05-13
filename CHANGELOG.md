# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.2] - 2026-05-13

### Added

- Create release notes header using README H1 and first paragraph

## [1.0.1] - 2026-05-13

### Added

- Release workflow to create github release using latest changelog entry, triggered by tag push

## [1.0.0] - 2026-05-13

### Added
- Typewriter animation on the homepage banner with configurable speed and delay
- Custom JS build pipeline using Rollup with npm package support
- Split JS output into `vendor.min.js` (Ghost shared assets) and `main.min.js` (theme bundle) to preserve load order
- GitHub Actions workflow for automatic theme deployment to Ghost Admin API on push to `main`

### Changed
- Fork from the official [Ghost Journal theme](https://github.com/TryGhost/Journal)
- Replace Yarn with npm for package management
- Update README to reflect customizations, live site, and corrected build instructions

