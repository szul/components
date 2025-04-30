/**
 * Configuration options for the AudioPlayer
 */
export interface AudioPlayerOptions {
    /**
     * ID of the HTML container element for the audio player (without the # prefix)
     */
    ContainerID: string;

    /**
     * Default audio source URL
     */
    DefaultSource: string;
}

/**
 * AudioPlayer - A class for creating customizable audio players with playlist support
 */
export class AudioPlayer {
    /**
     * Player configuration options
     */
    private _opts: AudioPlayerOptions;

    /**
     * Reference to the audio container DOM element
     */
    private _audioContainer: HTMLDivElement;

    /**
     * Creates an instance of AudioPlayer.
     * Initializes the audio player with the specified container and default source.
     * 
     * @param opts - Configuration options
     * @throws Error if the container or audio element cannot be found
     */
    constructor(opts: AudioPlayerOptions) {
        this._opts = opts;
        const { ContainerID, DefaultSource } = this._opts;
        const audioContainer = document.querySelector(`#${ ContainerID }`) as HTMLDivElement;
        const audioPlayer = audioContainer.querySelector('audio') as HTMLAudioElement;
        if(DefaultSource != null) {
            audioPlayer.src = DefaultSource;
        }
        if(audioPlayer.controls == null) {
            audioPlayer.controls = true;
        }
        audioPlayer.style.display = 'block';
        this._audioContainer = audioContainer;
    }

    /**
     * Adds playlist functionality to the audio player.
     * Sets up click event listeners on playlist items to switch audio sources
     * and update audio player elements (cover image, title, date, summary).
     * 
     * @param playlistID - The ID of the playlist container element (without the # prefix)
     * @throws Error if the playlist element cannot be found
     */
    public withPlaylist(playlistID: string): void {
        const self = this;
        const audioPlayer = self._audioContainer.querySelector('audio') as HTMLAudioElement;
        const playlist = document.querySelector(`#${ playlistID }`) as HTMLDataListElement;
        const anchorNodes: NodeListOf<HTMLElement> = playlist.querySelectorAll('dt');
        const anchors = Array.from(anchorNodes);
        anchors.forEach((anchor: HTMLElement) => {
            anchor.addEventListener('click', function(): void {
                const source = anchor.getAttribute('data-source') as string;
                const img = anchor.getAttribute('data-cover-img') as string;
                const title = anchor.getAttribute('data-title') || anchor.innerText as string;
                const pubDate = anchor.getAttribute('data-pub') as string;
                const summary = anchor.getAttribute('data-summary') as string;
                audioPlayer.pause();
                audioPlayer.src = source;
                const audioPlayerCover = self._audioContainer.querySelector('#audio-player-cover') as HTMLDivElement;
                if(audioPlayerCover) {
                    const coverImage: HTMLImageElement = document.createElement('img');
                    coverImage.src = img;
                    coverImage.title = title;
                    coverImage.alt = title;
                    audioPlayerCover.innerHTML = '';
                    audioPlayerCover.appendChild(coverImage);
                }
                const audioPlayerTitle = self._audioContainer.querySelector('#audio-player-title') as HTMLDivElement;
                if(audioPlayerTitle) {
                    audioPlayerTitle.innerText = title;
                }
                const audioPlayerDate = self._audioContainer.querySelector('#audio-player-date') as HTMLDivElement;
                if(audioPlayerDate) {
                    audioPlayerDate.innerText = pubDate;
                }
                const audioPlayerSummary = self._audioContainer.querySelector('#audio-player-summary') as HTMLDivElement;
                if(audioPlayerSummary) {
                    audioPlayerSummary.innerText = summary;
                }
                audioPlayer.play();
            });
        });
    }
}

/**
 * Factory function to create an AudioPlayer instance
 * 
 * @param audioContainerID - ID of the container element (without the # prefix)
 * @param defaultSource - Optional default audio source URL
 * @returns A new AudioPlayer instance
 */
export const createAudioPlayer = (audioContainerID: string, defaultSource?: string): AudioPlayer => {
    return new AudioPlayer({ ContainerID: audioContainerID, DefaultSource: defaultSource as string });
};
