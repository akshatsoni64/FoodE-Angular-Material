import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { User } from 'src/app/models/user.model';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let htc: HttpTestingController;
  let mockUsers = [
    {
      'id': 1643868360,
      'username': 'admin',
      'password': '1234',
      'type': 'admin'
    },
    { 'id': 1643868679, 'username': 'akshat', 'password': '1234', 'type': 'user' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
      ],
    });
    service = TestBed.inject(AuthService);
    htc = TestBed.inject(HttpTestingController);
  });

  it('Instantiate Service', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch User[]', () => {
    let username: string = 'akshat';
    let arrUsers!: User[];
    service.authenticateUser(username).subscribe((res: User[]) => {
      arrUsers = res;
    });

    const requestUser =
        htc.expectOne(`${service.$apiUrl}user/?username=${username}`);
    expect(arrUsers).toBeFalsy();
    requestUser.flush(mockUsers);
    expect(arrUsers.length).toBe(2);
  });
});
