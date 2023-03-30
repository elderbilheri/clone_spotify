import { Component } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-searches',
  templateUrl: './searches.component.html',
  styleUrls: ['./searches.component.scss'],
})
export class SearchesComponent {
  searches = ['Blues', 'Trap Remix', 'Trap Brasil', 'Indie', 'Hip Hop Brasil'];

  fieldSearch = '';

  // Icone para Pesquisar
  faSearch = faSearch;

  setSearch(search: string) {
    this.fieldSearch = search;
  }

  getSearch() {
    console.log('Buscando...', this.fieldSearch);
  }
}
