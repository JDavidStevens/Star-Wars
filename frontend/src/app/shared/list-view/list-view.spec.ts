import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListView } from './list-view';
import { ListConfig } from './configs/list.config';

interface TestRow {
  name: string;
  model: string;
}

describe('ListView', () => {
  let component: ListView<TestRow>;
  let fixture: ComponentFixture<ListView<TestRow>>;

  const config: ListConfig<TestRow> = {
    title: 'Test Items',
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'model', label: 'Model' },
    ],
    filters: [],
  };

  const rows: TestRow[] = [
    { name: 'Sand Crawler', model: 'Digger Crawler' },
    { name: 'X-34 Landspeeder', model: 'X-34' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListView],
    }).compileComponents();

    fixture = TestBed.createComponent(ListView<TestRow>);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('config', config);
    fixture.componentRef.setInput('rows', rows);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title and column headers', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('h2')?.textContent).toContain('Test Items');
    const headers = Array.from(el.querySelectorAll('th')).map((th) => th.textContent?.trim());
    expect(headers).toEqual(['Name', 'Model']);
  });

  it('should render a row per item', () => {
    const el: HTMLElement = fixture.nativeElement;
    const cells = el.querySelectorAll('tbody tr:first-child td');
    expect(el.querySelectorAll('tbody tr').length).toBe(2);
    expect(cells[0].textContent?.trim()).toBe('Sand Crawler');
  });

  it('should show an empty message when there are no rows', async () => {
    fixture.componentRef.setInput('rows', []);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('tbody td')?.textContent).toContain(
      'No results found.',
    );
  });
});
