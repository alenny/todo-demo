import { Component, OnInit } from '@angular/core';
import { UserProfile } from 'src/app/models/user-profile';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.sass']
})
export class ProfilesComponent implements OnInit {

  items: string[] = [];
  profiles: UserProfile[] = [];
  selectedProfile: number = 0;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.dataService.getUserProfiles()
      .subscribe(result => {
        this.profiles = result;
        this.selectedProfile = result.length > 0 ? result[0].id : 0;
        console.log(this.profiles);
      });
  }
}
