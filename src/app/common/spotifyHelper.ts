import { newMusic, newPlaylist } from 'src/app/common/factories';
import { IUser } from '../interfaces/IUser';
import { IPlaylist } from './../interfaces/IPlaylist';
import { IArtists } from './../interfaces/IArtists';
import { IMusic } from './../interfaces/IMusic';
import { addMilliseconds, format } from 'date-fns';

export function SpotifyUserToUser(
  user: SpotifyApi.CurrentUsersProfileResponse
): IUser {
  return {
    id: user.id,
    name: user.display_name,
    imageUrl: user.images.pop().url,
  };
}

export function SpotifyPlaylistToPlaylist(
  playlist: SpotifyApi.PlaylistObjectSimplified
): IPlaylist {
  return {
    id: playlist.id,
    name: playlist.name,
    imageUrl: playlist.images.pop().url,
  };
}

export function SpotifyPlaylistFromPlaylist(
  playlist: SpotifyApi.SinglePlaylistResponse
): IPlaylist {
  if (!playlist) return newPlaylist();

  return {
    id: playlist.id,
    name: playlist.name,
    imageUrl: playlist.images.shift().url,
    musics: [],
  };
}

export function SpotifyArtistToArtist(
  artist: SpotifyApi.ArtistObjectFull
): IArtists {
  return {
    id: artist.id,
    name: artist.name,
    imageUrl: artist.images.sort((a, b) => a.width - b.width).pop().url,
  };
}

export function SpotifyTrackToMusic(
  spotifyTrack: SpotifyApi.TrackObjectFull
): IMusic {
  if (!spotifyTrack) return newMusic();

  const msToMinutes = (ms: number) => {
    const data = addMilliseconds(new Date(0), ms);
    return format(data, 'mm:ss');
  };

  return {
    id: spotifyTrack.uri,
    title: spotifyTrack.name,
    album: {
      id: spotifyTrack.id,
      name: spotifyTrack.album.name,
      imageUrl: spotifyTrack.album.images.shift().url,
    },
    artists: spotifyTrack.artists.map((artist) => ({
      id: artist.id,
      name: artist.name,
    })),
    time: msToMinutes(spotifyTrack.duration_ms),
  };
}
